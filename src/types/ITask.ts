import { Types } from 'mongoose';

export interface ITask {
  _id: Types.ObjectId | string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: string;
  priority: string;
  assigneeId: Types.ObjectId | string; //userId who is assigned to this task
  createdBy: 'admin' | 'user';
  createdByAdminId?: Types.ObjectId | string; //userId who is assigned to this task
}


export interface ITaskData {
    userId: string | Types.ObjectId;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    priority: string;
    role: 'user' | 'admin' | 'super-admin';
    assigneeId?: string | Types.ObjectId;
}