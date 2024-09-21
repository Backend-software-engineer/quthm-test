import bcrypt from 'bcryptjs';
import { workSpaceEmail } from '../../configs/config.server.js';
import { emailTemplates } from '../../constants/emailTemplates.js';
import { sendOptEmail } from '../../helpers/email-helper.js';
import { IUser } from '../../types/IUser.js';
import { UserDbService } from '../service/entity.service.js';

export const emailUtils = {
  sendOTPVerificationEmail: async (user: IUser) => {
    const OTP = Math.floor(Math.random() * 900000 + 100000); // Generate a random 6-digit OTP
    const timeToExpires = 5 * 60 * 1000; // 5 minutes in milliseconds
    const OTPExpiry = Date.now() + timeToExpires;
    const emailResendTime = Date.now() + 1.5 * 60 * 1000;

    let mailOptions = {
      from: `"Quthm" <${workSpaceEmail}>`,
      to: user.credentialDetails.email,
      subject: 'Email Verification',
      html: emailTemplates.verifyEmailText(OTP),
    };

    const request = await sendOptEmail(mailOptions);
    if (request.accepted) {
      // const hashOTP = await bcrypt.hash(OTP.toString(), 10);
      await UserDbService.updateRecord(user._id.toString(), {
        OTP,
        OTPExpiry,
        resendEmail: emailResendTime,
      });
    }

    return request;
  },
  sendForgetPasswordEmail: async (user: IUser) => {
    const OTP = Math.floor(Math.random() * 900000 + 100000); // Generate a random 6-digit OTP

    let mailOptions = {
      from: `"Quthm" <${workSpaceEmail}>`,
      to: user.credentialDetails.email,
      subject: 'Reset Password Request',
      html: emailTemplates.resetPasswordEmailText(OTP),
    };

    const request = await sendOptEmail(mailOptions);

    if (request.accepted) {
      const timeToExpires = 5 * 60 * 1000; // 5 minutes in milliseconds
      const resetTokenExpires = Date.now() + timeToExpires;
      const hashOTP = await bcrypt.hash(OTP.toString(), 10);
      await UserDbService.updateRecord(
        user._id.toString(),
        {
          OTP: hashOTP,
          OTPExpiry: resetTokenExpires,
        },
        {
          new: true,
        },
      );
    }
    return request;
  },
};
