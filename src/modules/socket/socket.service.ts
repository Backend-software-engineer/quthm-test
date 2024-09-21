import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class SocketService {
  userJoin(userId: string, client: Socket) {
    client.join(userId);
  }
}
