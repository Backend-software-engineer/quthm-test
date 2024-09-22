import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Types } from 'mongoose';

export class AuthUtils {
  private readonly configService: ConfigService = new ConfigService();
  private readonly jwtService: JwtService = new JwtService();
  constructor() {}
  generateAccessSignToken(payload: { id: Types.ObjectId; role: string }) {
    const accessToken = this.jwtService.sign(
      {
        ...payload,
        iss: 'task.com',
        aud: payload.role,
        type: 'access_token',
      },
      {
        secret: this.configService.get('JWT_ACCESS_SECRET_KEY'),
        expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRY'),
      },
    );

    return accessToken;
  }
  generateRefreshSignToken(payload: { id: Types.ObjectId; role: string }) {
    const refreshToken = this.jwtService.sign(
      {
        ...payload,
        iss: 'task.com',
        aud: payload.role,
        type: 'refresh_token',
      },
      {
        secret: this.configService.get('JWT_REFRESH_SECRET_KEY'),
        expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRY'),
      },
    );
    return refreshToken;
  }

  generateTempToken(payload: { id: Types.ObjectId; role: string }) {
    const accessToken = this.jwtService.sign(
      {
        ...payload,
        iss: 'task.com',
        aud: payload.role,
        type: 'access_token',
      },
      {
        secret: this.configService.get('JWT_ACCESS_SECRET_KEY'),
        expiresIn: '5m',
      },
    );

    return accessToken;
  }
}
