import { Types } from "mongoose";

export interface IRefreshToken {
  userId: Types.ObjectId;
  token: string;
}
