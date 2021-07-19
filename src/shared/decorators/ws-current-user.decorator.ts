import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ExtendedSocket } from '../interfaces/extended-socket.interface';

export const WsCurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = context.switchToWs().getClient<ExtendedSocket>();
    return ctx.user;
  },
);
