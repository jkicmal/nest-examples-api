import { Logger, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsCurrentUser } from 'src/shared/decorators/ws-current-user.decorator';
import { CurrentUserPayload } from 'src/shared/interfaces/current-user-payload.interface';
import { JwtWsAuthGuard } from '../auth/guards/jwt-ws-auth.guard';
import { JwtService } from '../auth/services/jwt.service';
import { LoggerService } from '../logger/logger.service';

export enum ChatGatewayMessages {
  SendMessage = 'send-message',
  MessageSent = 'message-sent',
  JoinRoom = 'join-room',
  RoomJoined = 'room-joined',
  LeaveRoom = 'leave-room',
  RoomLeft = 'room-left',
}

export enum ChatGatewayRooms {
  None = 'none',
  Memes = 'memes',
  Frontend = 'frontend',
  Backend = 'backend',
}

interface SendMessageDto {
  userId: string;
  userName: string;
  time: number;
  message: string;
  room: string;
}

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private logger = new Logger('ChatGateway');

  constructor(private loggerService: LoggerService) {}

  @WebSocketServer()
  public server: Server;

  handleDisconnect() {
    this.logger.log('Client Disconnected');
  }

  async handleConnection(@ConnectedSocket() client: Socket) {
    this.loggerService.log('Client Connected', this);
  }

  @SubscribeMessage(ChatGatewayMessages.SendMessage)
  @UseGuards(JwtWsAuthGuard)
  handleSendMessage(
    @MessageBody() body: SendMessageDto,
    @ConnectedSocket() client: Socket,
    @WsCurrentUser() currentUser: CurrentUserPayload,
  ) {
    console.log(currentUser);
    if (client.rooms.has(body.room)) {
      this.server.to(body.room).emit(ChatGatewayMessages.MessageSent, body);
      this.logger.log('Message Sent');
    }
  }

  @SubscribeMessage(ChatGatewayMessages.JoinRoom)
  handleJoinRoom(
    @MessageBody() room: ChatGatewayRooms,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(room);
    client.emit(ChatGatewayMessages.RoomJoined, room);
    this.logger.log(`Room (${room}) joined.`);
  }

  @SubscribeMessage(ChatGatewayMessages.LeaveRoom)
  handleLeaveRoom(
    @MessageBody() room: ChatGatewayRooms,
    @ConnectedSocket() client: Socket,
  ) {
    client.leave(room);
    client.emit(ChatGatewayMessages.RoomLeft, room);
    this.logger.log(`Room (${room}) left.`);
  }
}
