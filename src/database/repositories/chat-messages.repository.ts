import { Repository } from 'typeorm';
import { ChatMessage } from '../entities';

export class ChatMessagesRepository extends Repository<ChatMessage> {}
