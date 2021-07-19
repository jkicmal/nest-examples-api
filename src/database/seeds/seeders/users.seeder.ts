import { Factory } from 'typeorm-seeding';
import { User } from '../../entities';

export default async (factory: Factory): Promise<void> => {
  await factory(User)().createMany(10);
};
