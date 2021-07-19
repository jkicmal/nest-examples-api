import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from 'src/database/repositories';
import { AuthController } from './auth.controller';
import { SigninCommandHandler } from './commands/signin/signin.command';
import { SignupCommandHandler } from './commands/signup/signup.command';

const CommandHandlers = [SigninCommandHandler, SignupCommandHandler];
const QueryHandlers = [];

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository]), CqrsModule],
  controllers: [AuthController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class AuthModule {}
