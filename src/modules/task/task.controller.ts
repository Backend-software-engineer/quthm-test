import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from '../../common/guards/auth/index.js';
import { CreateTaskDto, UpdateTaskDto } from './dto/task-dto.js';
import { TaskService } from './task.service.js';

@Controller('/api/v1/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('/')
  @UseGuards(Auth)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async createTask(@Request() req: any, @Body() CreateTaskDto: CreateTaskDto) {
    try {
      const userId = req.user._id;
      const role = req.user.role;
      const task = await this.taskService.createTask({
        userId,
        ...CreateTaskDto,
        role,
      });
      return task;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  @Get('/')
  @UseGuards(Auth)
  async getTasks(
    @Request() req: any,
    @Query() query: { status?: string; page?: number; limit?: number },
  ) {
    try {
      const { status, page = 1, limit = 10 } = query;
      const userId = req.user._id;
      const role = req.user.role;
      const tasks = await this.taskService.getTasks({
        userId,
        role,
        page,
        limit,
        status,
      });

      return tasks;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  // update task
  @Patch('/:taskId')
  @UseGuards(Auth)
  async updateTask(
    @Request() req: any,
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    try {
      const userId = req.user._id;
      const role = req.user.role;

      const task = await this.taskService.updateTask({
        role,
        taskId,
        userId,
        updateTaskDto,
      });

      return task;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }

  @Get('/:taskId')
  @UseGuards(Auth)
  async taskDetails(@Param('taskId') taskId: string, @Request() req: any) {
    try {
      const userId = req.user.id;
      const role = req.user.role;
      const task = await this.taskService.taskDetails(taskId, userId, role);
      return task;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.EXPECTATION_FAILED);
    }
  }
}
