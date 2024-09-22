import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from '../../common/guards/auth/index.js';
import { AuthService } from './auth.service.js';
import {
  CheckUserEmailDto,
  EntitySignupWithEmailDto,
  UserLoginEmailDto,
  UserVerifyEmailDto,
} from './dto/user-dto.js';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/check-email')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async checkUserEmail(@Query() checkUserEmailDto: CheckUserEmailDto) {
    try {
      const user = await this.authService.checkUserEmail(checkUserEmailDto);
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  @Post('/signup-user')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async signup(@Body() userSignupWithEmailDto: EntitySignupWithEmailDto) {
    try {
      const user = await this.authService.signup(userSignupWithEmailDto);
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  @Get('/send-otp/:userId')
  async sendOTP(@Param('userId') userId: string) {
    try {
      const user = await this.authService.sendOTP(userId);
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  @Patch('/verify-email')
  @UseGuards(Auth)
  async verifyEmail(
    @Request() req: any,
    @Body() userVerifyEmailDto: UserVerifyEmailDto,
  ) {
    try {
      const userId = req.user._id;
      const user = await this.authService.verifyEmail({
        ...userVerifyEmailDto,
        userId,
      });
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  @Post('/login-email')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async loginEmail(@Body() userLoginEmailDto: UserLoginEmailDto) {
    try {
      const user = await this.authService.loginEmail(userLoginEmailDto);
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }
}
