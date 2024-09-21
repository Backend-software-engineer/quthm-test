import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserDbService } from '../../../common/service/entity.service.js';
import Logger from '../../utils/logger.js';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {
    super();
    Logger.info('Using jwt auth guard');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest<Request>();
      const token = this.extractToken(request);

      if (!token) {
        throw new HttpException(
          'No token provided, authentication denied',
          401,
        );
      }

      const decoded = await this.verifyToken(token);
      const user = await UserDbService.getRecordById(decoded.id, '+role');

      if (!this.isTokenValid(decoded, user)) {
        throw new HttpException('Invalid token or user', 401);
      }

      // Role checking
      const roles = this.reflector.get<string[]>('roles', context.getHandler());
      if (roles && !roles.includes(user.role)) {
        throw new HttpException(
          'You are not allowed to perform this action',
          403,
        );
      }

      request.user = user;
      return true;
    } catch (error) {
      throw new HttpException(error.message, 401);
    }
  }

  private extractToken(req: Request): string | null {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
      return authHeader.split(' ')[1];
    }
    return null;
  }

  private async verifyToken(token: string): Promise<any> {
    const accessSecretKey = this.configService.get<string>(
      'JWT_ACCESS_SECRET_KEY',
    );
    return this.jwtService.verifyAsync(token, { secret: accessSecretKey });
  }

  private isTokenValid(decoded: any, user: any): boolean {
    if (
      decoded.iss !== 'task.com' ||
      !user ||
      user.status !== 'active' ||
      user.role !== decoded.aud //when ever token gernerated for user. In that token I specifying aud (audiance) like user,admin,super-admin

      // if me as an entity generated token when my role was super admin. I cant use same token, where i needs to perform action as `admin` or `user` role
    ) {
      return false;
    }
    return true;
  }
}
