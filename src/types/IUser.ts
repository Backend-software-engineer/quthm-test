import { Types } from 'mongoose';
import { ILocation } from './ILocation.js';

// personal information interface
export interface IPersonalInformation {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: string;
  dob?: Date;
  profilePic: string;
}

// credential details interface
export interface ICredentialDetails {
  email: string;
  password: string;
  googleId?: string;
}

export interface IverifyStatus {
  emailVerified: boolean;
}

export interface IUser {
  _id: Types.ObjectId;
  personalInformation: IPersonalInformation;
  credentialDetails: ICredentialDetails;
  location: ILocation;
  verifyStatus: IverifyStatus;
  status: 'active' | 'archived' | 'banned' | 'blocked';
  role: 'admin' | 'user';
  currentRole: string;
  OTP: string;
  OTPExpiry: Date;
  resendEmail: Date;
}

// Define the rest of the interfaces here...
