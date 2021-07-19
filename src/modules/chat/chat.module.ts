import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({
  imports: [AuthModule],
  controllers: [],
  providers: [ChatGateway, ChatService],
  exports: [ChatGateway],
})
export class ChatModule {
  constructor() {
    console.log('Chat module initialized.');
  }
}
