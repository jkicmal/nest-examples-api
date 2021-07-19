import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from 'src/config/config.service';
import { UsersRepository } from 'src/database/repositories';
import { AuthController } from './auth.controller';
import { SigninCommandHandler } from './commands/signin/signin.command';
import { SignupCommandHandler } from './commands/signup/signup.command';
import { JwtStrategy } from './strategies/jwt.strategy';

const CommandHandlers = [SigninCommandHandler, SignupCommandHandler];
const QueryHandlers = [];

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
    CqrsModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.jwtSecret,
        signOptions: { expiresIn: configService.jwtExpiresIn },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [...CommandHandlers, ...QueryHandlers, JwtStrategy],
})
export class AuthModule {}
