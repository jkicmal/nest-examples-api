import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { LoggerService } from 'src/modules/logger/logger.service';
import { CurrentUserPayload } from 'src/shared/interfaces/current-user-payload.interface';
import { ExtendedSocket } from 'src/shared/interfaces/extended-socket.interface';
import { JwtService } from '../services/jwt.service';

@Injectable()
export class JwtWsAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private loggerService: LoggerService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient<ExtendedSocket>();
    try {
      const payload: CurrentUserPayload = await this.jwtService.verify(
        client.handshake.auth.token,
      );
      client.user = payload;
      return true;
    } catch (err) {
      client.disconnect();
      this.loggerService.log(err, this, err.stack);
      throw new WsException('Unauthicated.');
    }
  }
}
