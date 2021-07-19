import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/database/repositories';
import { GetCurrentUserQueryHandler } from './queries/get-current-user/get-current-user.query';
import { UsersController } from './users.controller';

const QueryHandlers = [GetCurrentUserQueryHandler];

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([UsersRepository])],
  controllers: [UsersController],
  providers: [...QueryHandlers],
})
export class UsersModule {}
