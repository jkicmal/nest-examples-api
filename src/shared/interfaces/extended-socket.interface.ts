import { Socket } from 'socket.io';
import { CurrentUserPayload } from './current-user-payload.interface';

export interface ExtendedSocket extends Socket {
  user: CurrentUserPayload;
}
