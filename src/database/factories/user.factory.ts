import { define } from 'typeorm-seeding';
import { User } from '../entities';
import * as Faker from 'faker';

define(User, (faker: typeof Faker) => {
  const user = new User();
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  user.name = `${firstName} ${lastName}`;
  user.email = faker.internet.email(firstName, lastName);
  user.password = faker.internet.password(4, true);
  return user;
});
