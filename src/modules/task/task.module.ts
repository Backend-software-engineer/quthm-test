import { Module } from '@nestjs/common';
import { SocketGateway } from '../../common/gateways/socket.gateway.js';
import { SocketModule } from '../socket/socket.module.js';
import { SocketService } from '../socket/socket.service.js';
import { TaskController } from './task.controller.js';
import { TaskService } from './task.service.js';

@Module({
  controllers: [TaskController],
  providers: [TaskService, SocketGateway, SocketService],
})
export class TaskModule {}
