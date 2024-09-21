import { IUser } from '../src/types/IUser.js';

declare module 'express' {
  export interface Request {
    user?: IUser; // Define the user type here or replace it with the correct type
  }
}
