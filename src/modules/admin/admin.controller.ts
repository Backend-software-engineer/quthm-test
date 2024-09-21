import {
  Body,
  Controller,
  Delete,
  HttpException,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Roles } from '../../common/decorators.ts/roles.decorator.js';
import { Auth } from '../../common/guards/auth/index.js';
import { AuthService } from '../auth/auth.service.js';
import { EntitySignupWithEmailDto } from '../auth/dto/user-dto.js';
import { AdminService } from './admin.service.js';

@Controller('/api/v1/admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly authService: AuthService,
  ) {}

  @Post('/add-superadmin')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async signupSuperAdmin(
    @Body() adminSignUpWithEmailDto: EntitySignupWithEmailDto,
  ) {
    try {
      const superAdmin = await this.authService.signup(
        adminSignUpWithEmailDto,
        'super-admin',
      );

      return superAdmin;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  @Post('/new-admin')
  @UseGuards(Auth)
  @Roles('super-admin') //Only super admin can add new admin
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async addNewAdmin(@Body() adminSignUpWithEmailDto: EntitySignupWithEmailDto) {
    try {
      const superAdmin = await this.authService.signup(
        adminSignUpWithEmailDto,
        'admin',
      );

      return superAdmin;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  @Delete('/remove-task/:taskId')
  @UseGuards(Auth)
  @Roles('super-admin', 'admin') //Only super admin and admin can delete task
  async deleteTask(@Param('taskId') taskId: string) {
    try {
      const task = await this.adminService.removeTask(taskId);
      return task
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }
}
