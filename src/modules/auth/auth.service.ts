import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { Types } from 'mongoose';
import { UserDbService } from '../../common/service/entity.service.js';
import { AuthUtils } from '../../common/utils/auth-utils.js';
import { emailUtils } from '../../common/utils/email-utils.js';
import {
  CheckUserEmailDto,
  EntitySignupWithEmailDto,
  UserLoginEmailDto,
} from './dto/user-dto.js';

@Injectable()
export class AuthService {
  async checkUserEmail(checkUserEmailDto: CheckUserEmailDto) {
    const { email } = checkUserEmailDto;
    const select = '';
    const findUser = await UserDbService.getRecord(
      { 'credentialDetails.email': email },
      select,
    );
    if (!findUser) {
      return {
        success: true,
        message: 'Create account',
      };
    }
    if (findUser.verifyStatus.emailVerified === true) {
      return {
        success: true,
        message: 'login please',
        user: findUser,
      };
    }

    if (findUser.verifyStatus.emailVerified === false) {
      return {
        success: true,
        message: 'verify email',
        user: findUser,
      };
    }
  }

  async signup(
    userSignupWithEmailDto: EntitySignupWithEmailDto,
    role?: string,
  ) {
    const {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      gender,
      dob,
      phoneNumber,
    } = userSignupWithEmailDto;
    if (password !== confirmPassword) {
      throw new Error('password and confirmPassword should be same');
    }
    const userData = {
      personalInformation: {
        firstName,
        lastName,
        gender,
        dob,
        phoneNumber,
      },
      role,
      credentialDetails: {
        email,
        password,
      },
    };

    const checkUser = await UserDbService.getRecord(
      {
        'credentialDetails.email': email,
      },
      'verifyStatus',
    );

    if (checkUser && checkUser.verifyStatus.emailVerified) {
      throw new Error('User already exists with this email');
    }

    if (checkUser && !checkUser.verifyStatus.emailVerified) {
      throw new Error('Please verify your email first');
    }
    const user = await UserDbService.createRecord(userData);
    user.credentialDetails.password = undefined;
    return {
      success: true,
      message: 'user created successfully',
      user,
    };
  }

  async sendOTP(userId: string) {
    const user = await UserDbService.getRecordById(userId);
    if (!user) {
      throw new Error('invalid userId');
    }

    if (user.verifyStatus.emailVerified) {
      throw new Error('Email already verified');
    }
    if (user.resendEmail && new Date().getTime() < user.resendEmail.getTime()) {
      const timeLeft =
        (user.resendEmail.getTime() - new Date().getTime()) / 1000;
      throw new Error(`Please try after ${Math.ceil(timeLeft)} seconds.`);
    }

    const emailRequest = await emailUtils.sendOTPVerificationEmail(user);
    if (emailRequest.accepted) {
      return { success: true, message: 'OTP sent successfully' };
    } else {
      throw new Error('Error in sending email. Please resend');
    }
  }

  async verifyEmail(payload: { otp: string; userId: string | Types.ObjectId }) {
    const user = await UserDbService.getRecordById(
      payload.userId,
      '+OTP +role',
    );

    if (!user) {
      throw new Error('invalid userId');
    }

    if (user.verifyStatus.emailVerified) {
      throw new Error('email already verified');
    }

    if (new Date(user.OTPExpiry) < new Date()) {
      throw new Error('OTP expired. Please resend');
    }
    if (user.OTP !== payload.otp) {
      throw new Error('invalid OTP. Please resend');
    }

    const updatedUser = await UserDbService.updateRecord(user.id, {
      $set: {
        verifyStatus: {
          emailVerified: true,
        },
      },
      $unset: {
        OTP: 1,
        OTPExpiry: 1,
        resendEmail: 1,
      },
    });

    const authUtils = new AuthUtils();
    const accessToken = authUtils.generateAccessSignToken({
      id: user.id,
      role: user.role,
    });
    const refreshToken = authUtils.generateRefreshSignToken({
      id: user.id,
      role: user.role,
    });

    return {
      success: true,
      message: 'Email verified Successfully',
      user: updatedUser,
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }

  async loginEmail(userLoginEmailDto: UserLoginEmailDto) {
    const { email, password } = userLoginEmailDto;
    const select = '+credentialDetails.password +role';
    const user = await UserDbService.getRecord(
      { 'credentialDetails.email': email },
      select, 
    );

    if (!user) {
      throw new Error('Invalid credentials. Please try again');
    }

    if (!user.verifyStatus.emailVerified) {
      throw new Error('Please verify your email first');
    }
    if (user.status !== 'active') {
      throw new Error('Your account is not active.Please contact our support');
    }

    const checkPassword = await bcrypt.compare(
      password,
      user.credentialDetails.password,
    );

    if (!checkPassword) {
      throw new Error('Invalid credentials. Please try again');
    }
    const authUtils = new AuthUtils();
    const accessToken = authUtils.generateAccessSignToken({
      id: user.id,
      role: user.role,
    });
    const refreshToken = authUtils.generateRefreshSignToken({
      id: user.id,
      role: user.role,
    });

    return {
      success: true,
      message: 'Login successfully',
      user,
      tokens: {
        accessToken,
        refreshToken,
      },
    };
  }
}
