import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ChatMessage } from './chat-message.entity';

@Entity()
export class User extends BaseEntity {
  @Column('varchar', { length: 64, nullable: false })
  email: string;

  @Column('varchar', { length: 64, nullable: false })
  name: string;

  @Column('varchar', { length: 64, nullable: false })
  password: string;

  @OneToMany(() => ChatMessage, (chatMessage) => chatMessage.author)
  chatMessages: Array<ChatMessage>;
}
