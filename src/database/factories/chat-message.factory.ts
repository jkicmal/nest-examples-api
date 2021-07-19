import * as faker from 'faker';
import { define } from 'typeorm-seeding';
import { ChatMessage } from '../entities';

const rooms = ['memes', 'frontend', 'backend'];
const startDate = '2000-01-01';
const endDate = '2000-01-31';
const minBodyLines = 1;
const maxBodyLines = 3;

define(ChatMessage, () => {
  const chatMessage = new ChatMessage();
  chatMessage.body = faker.lorem.lines(
    faker.datatype.number({ min: minBodyLines, max: maxBodyLines }),
  );
  chatMessage.room = faker.random.arrayElement(rooms);
  chatMessage.createdAt = faker.date.between(startDate, endDate);
  return chatMessage;
});
