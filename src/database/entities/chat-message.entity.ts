import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity()
export class ChatMessage extends BaseEntity {
  @Column('varchar', { length: 256, nullable: false })
  body: string;

  @Column('varchar', { length: 16, nullable: false })
  room: string;

  @ManyToOne(() => User, (user) => user.chatMessages)
  author: User;
}
