import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { HttpExceptionFilter } from './common/filters/httpException.filter.js';
import Logger from './common/utils/logger.js';
import * as serverConfig from './configs/config.server.js';
import { mongooseConnect } from './connections/connection.db.js';

async function bootstrap() { 
  mongooseConnect().then(async () => {
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new HttpExceptionFilter()); // Apply the filter globally
    await app.listen(serverConfig.port);
    Logger.success(`Server running on port ${serverConfig.port}`);
  });
}
bootstrap();
