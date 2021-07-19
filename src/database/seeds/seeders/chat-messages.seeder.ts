import { Connection } from 'typeorm';
import { Factory } from 'typeorm-seeding';
import { ChatMessage, User } from '../../entities';

export default async (
  factory: Factory,
  connection: Connection,
): Promise<void> => {
  const usersRepository = connection.getRepository(User);
  const users = await usersRepository
    .createQueryBuilder('user')
    .leftJoinAndSelect('user.chatMessages', 'chatMessage')
    .getMany();

  for (const user of users) {
    const messages = await factory(ChatMessage)().createMany(10);
    user.chatMessages = [...user.chatMessages, ...messages];
    await usersRepository.save(user);
  }
};
