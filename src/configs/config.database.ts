import { ConfigService } from '@nestjs/config';

class MongooseConfig {
  constructor(private readonly configService: ConfigService) {}

  getUri(): string {
    return this.configService.get('DATABASE_URL');
  }

  getOptions() {
    return {
      autoIndex: true, // Don't build indexes
      maxPoolSize: 100, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    };
  }
}

const mongooseConfig = new MongooseConfig(new ConfigService());

export default mongooseConfig;
