import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { environment } from './configs/config.server.js';
import { AdminModule } from './modules/admin/admin.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { TaskModule } from './modules/task/task.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `env/.env.${environment || 'development'}`, // Load the correct .env file based on the environment
      isGlobal: true, // Makes the config globally available
    }),
    AuthModule,
    TaskModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
