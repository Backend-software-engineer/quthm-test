import { Injectable } from '@nestjs/common';
import { TaskDbService } from '../../common/service/entity.service.js';

@Injectable()
export class AdminService {
  async removeTask(taskId: string) {
    // we can do soft delete also, intentionally i want to delete from db
    const task = await TaskDbService.deleteRecord(taskId);

    if (!task) throw new Error('Invalid taskId');

    return task;
  }
}
