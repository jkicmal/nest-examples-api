import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from '../auth/auth.module';
import { ChatModule } from '../chat/chat.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [ChatModule, UsersModule, ConfigModule, DatabaseModule, AuthModule],
})
export class AppModule {
  constructor() {
    console.log('App module initialized.');
  }
}
