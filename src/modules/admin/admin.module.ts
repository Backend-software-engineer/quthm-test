import { Module } from '@nestjs/common';
import { AuthService } from '../auth/auth.service.js';
import { AdminController } from './admin.controller.js';
import { AdminService } from './admin.service.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [AuthModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {} 
