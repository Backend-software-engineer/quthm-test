import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from '../../modules/socket/socket.service.js';
//   import { EntityUpdatePayload } from '../interfaces/entity-update.interface';

@WebSocketGateway({ cors: true })
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly socketService: SocketService) {}

  afterInit(server: Server) {
    console.log('WebSocket Initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  sendUpdatedDataToSpecificUser(userId: string, data: any, eventName: string) {
    this.server.to(userId).emit(eventName, data);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any) {
    console.log(`Message received from ${client.id}:`, payload);
    // Broadcast the message to all connected clients
    this.server.emit('message', `payload: ${payload}`);
  }

  // From front end i will listen this event as user joined
  @SubscribeMessage('user-joined')
  handleUserJoined(client: Socket, payload: { userId: string }) {
    const { userId } = payload;
    // this.socketService.addClient(userId, client);
    this.socketService.userJoin(userId, client);
    console.log(`User joined: ${userId} (Client ID: ${client.id})`);
  }

  // For testing purpose to see all userIds
  @SubscribeMessage('list-users')
  handleListAllUsers(client: Socket, message: string) {
    const connectedUserIds: string[] = [];
    this.server.sockets.sockets.forEach((socket) => {
      const userId = Array.from(socket.rooms).find(
        (room) => room !== socket.id,
      ); // Get user ID from rooms
      if (userId) {
        connectedUserIds.push(userId);
      }
    });
    console.log('message', message);
    console.log({ connectedUserIds });
    return connectedUserIds;
  }
}
