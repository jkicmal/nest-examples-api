import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from 'src/config/config.service';
import { UsersRepository } from 'src/database/repositories';
import { AuthController } from './auth.controller';
import { SigninCommandHandler } from './commands/signin/signin.command';
import { SignupCommandHandler } from './commands/signup/signup.command';
import { JwtService } from './services/jwt.service';
import { JwtStrategy } from './strategies/jwt.strategy';

const CommandHandlers = [SigninCommandHandler, SignupCommandHandler];
const QueryHandlers = [];

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([UsersRepository]),
    CqrsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.jwtSecret,
        signOptions: { expiresIn: configService.jwtExpiresIn },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [...CommandHandlers, ...QueryHandlers, JwtStrategy, JwtService],
  exports: [JwtService],
})
export class AuthModule {}
