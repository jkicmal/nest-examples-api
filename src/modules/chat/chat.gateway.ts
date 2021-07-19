import { Logger } from '@nestjs/common';
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
import { Socket, Server } from 'socket.io';

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
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('ChatGateway');

  @WebSocketServer()
  public server: Server;

  afterInit() {
    this.logger.log('Socket Initialized');
  }

  handleDisconnect() {
    this.logger.log('Client Disconnected');
  }

  handleConnection() {
    this.logger.log('Client Connected');
  }

  @SubscribeMessage(ChatGatewayMessages.SendMessage)
  handleSendMessage(
    @MessageBody() body: SendMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(client.rooms);
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
