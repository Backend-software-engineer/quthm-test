import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.js';

export const Auth = new JwtAuthGuard(
  new JwtService(),
  new ConfigService(),
  new Reflector(),
)
