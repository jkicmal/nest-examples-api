import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import chatMessagesSeeder from './seeders/chat-messages.seeder';
import usersSeeder from './seeders/users.seeder';

export default class MainSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await usersSeeder(factory);
    await chatMessagesSeeder(factory, connection);
  }
}
