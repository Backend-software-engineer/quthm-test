import mongoose, { Schema } from 'mongoose';
import { collectionNames } from '../constants/collectionNames.js';
import { ITask } from '../types/ITask.js';

const taskSchema: Schema<ITask> = new Schema<ITask>(
  {
    title: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, unique: true, trim: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    createdBy: { type: String },
    createdByAdminId: {
      type: Schema.Types.ObjectId,
      ref: collectionNames.USER,
    },
    status: {
      type: String,
      enum: ['pending', 'inprogress', 'completed', 'cancelled'],
      default: 'pending',
      required: true,
    },
    priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
    assigneeId: {
      type: Schema.Types.ObjectId,
      ref: collectionNames.USER,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const TaskModel = mongoose.model<ITask>(collectionNames.TASK, taskSchema);
export default TaskModel;
