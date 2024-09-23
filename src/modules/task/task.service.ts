import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { SocketGateway } from '../../common/gateways/socket.gateway.js';
import { TaskDbService } from '../../common/service/entity.service.js';
import { createPaginatedResponse } from '../../common/utils/response-utils.js';
import { SOCKET_EVENTS } from '../../constants/socketEvents.js';
import { ITaskData } from '../../types/ITask.js';

@Injectable()
export class TaskService {
  constructor(private readonly socketGateway: SocketGateway) {}
  async createTask(data: ITaskData) {
    const { role, userId, assigneeId, ...taskDetails } = data;

    const taskData: Record<string, any> = {
      ...taskDetails,
      createdBy: role,
    };
    // I have an option to create seprate API for admin and user for creating task but i prefer this way
    if (role === 'admin' || (role === 'super-admin' && !assigneeId)) {
      taskData.assigneeId = userId; // Admins can assign to themseleves
      taskData.createdByAdminId = userId; // Store who created the task
    } else if (role === 'user') {
      taskData.assigneeId = userId; // Users only can assign tasks to themselves
    } else if (role === 'super-admin' || (role === 'admin' && assigneeId)) {
      taskData.assigneeId = assigneeId; // Admin can assign to others users as well
      taskData.createdByAdminId = userId; // Record who created the task
    }

    const task = await TaskDbService.createRecord(taskData);
    return task;
  }

  async getTasks(data: {
    userId: Types.ObjectId;
    role: string;
    page: number;
    limit: number;
    status?: string;
  }) {
    let query: any = {};
    if (data.status) {
      query.status = data.status;
    }
    // user can manage only their tasks while admin can all
    if (data.role === 'user') {
      query.assigneeId = data.userId;
    }

    const [tasks, tasksCount] = await Promise.all([
      TaskDbService.getRecords(query, data.page, data.limit),
      TaskDbService.getTotalCount(query),
    ]);

    return createPaginatedResponse(tasks, tasksCount, data.page, data.limit);
  }

  async updateTask(data: {
    role: string;
    taskId: string;
    userId: Types.ObjectId;
    updateTaskDto: Record<string, any>;
  }) {
    const { role, taskId, userId, updateTaskDto } = data;
    const task = await TaskDbService.getRecordById(taskId);
    if (!task) {
      throw new Error('invalid taskId');
    }
    // Just an extra level of security, otherwise through get API user will see only their tasks
    if (role == 'user' && !task.assigneeId.equals(userId)) {
      throw new Error('You can update only your tasks');
    }

    const updatedTask = await TaskDbService.updateRecord(taskId, updateTaskDto);
    // Real time this will be send to that user who is assigned to this task
    this.socketGateway.sendUpdatedDataToSpecificUser(
      updatedTask.assigneeId.toString(),
      updatedTask,
      SOCKET_EVENTS.taskUpdate,
    );
    return updatedTask;
  }

  async taskDetails(
    taskId: string | Types.ObjectId,
    userId: string,
    role: string,
  ) {
    const task = await TaskDbService.getRecordById(taskId);
    // extra security check
    if (role === 'user' && task.assigneeId != userId) {
      throw new Error('You can view only your tasks');
    }
    if (!task) {
      throw new Error('invalid taskId');
    }
    return task;
  }
}
