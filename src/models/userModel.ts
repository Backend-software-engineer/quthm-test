import bcrypt from 'bcryptjs';
import mongoose, { Schema } from 'mongoose';
import { collectionNames } from '../constants/collectionNames.js';
import { IUser } from '../types/IUser.js';

const userSchema: Schema<IUser> = new Schema<IUser>(
  {
    personalInformation: {
      firstName: { type: String },
      lastName: { type: String },
      phoneNumber: { type: String },
      gender: { type: String },
      dob: { type: Date },
      profilePic: { type: String },
    },
    credentialDetails: {
      email: { type: String, required: true, unique: true },
      password: { type: String, select: false }, //Not send in response
    },
    verifyStatus: {
      emailVerified: { type: Boolean, default: false },
    },
    role: {
      type: String,
      enum: ['admin', 'user', 'super-admin'],
      default: 'user',
      select:false
    },
    status: {
      type: String,
      enum: ['active', 'banned', 'blocked', 'archived'],
      default: 'active',
    },
    OTP: {
      type: String,
      select: false, //Not send in response
    },
    OTPExpiry: {
      type: Date,
    },
    resendEmail: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  },
);

// mongoose middleware which will run before saving the document into the database
userSchema.pre('save', async function (next) {
  // Password will get hashed when the password field gets update
  if (!this.isModified('credentialDetails.password')) return next();

  if (!this.credentialDetails.password) {
    return next();
  }
  // Hash the password
  this.credentialDetails.password = await bcrypt.hash(
    this.credentialDetails.password,
    12,
  );

  next();
});

const UserModel = mongoose.model<IUser>(collectionNames.USER, userSchema);
export default UserModel;
