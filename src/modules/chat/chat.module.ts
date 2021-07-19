import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ChatGateway, ChatService],
  exports: [ChatGateway],
})
export class ChatModule {
  constructor() {
    console.log('Chat module initialized.');
  }
}
