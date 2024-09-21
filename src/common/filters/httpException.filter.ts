import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

import Logger from '../utils/logger.js';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse: any = exception.getResponse();
    Logger.error(
      `${status} - ${exceptionResponse.message ?? exceptionResponse}`,
    );

    return response.status(status).json({
      statusCode: status,
      message:
        exceptionResponse.message ||
        exceptionResponse ||
        'Internal Server Error',
      error: exceptionResponse.error || 'Unknown Error',
      timestamp: new Date().toISOString(),
    });
  }
}
