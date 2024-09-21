import { Module } from '@nestjs/common';
import { SocketGateway } from '../../common/gateways/socket.gateway.js';
import { SocketService } from './socket.service.js';

@Module({
  providers: [SocketGateway, SocketService],
  controllers: [], // Optional
  exports: [SocketGateway],
})
export class SocketModule {}
