import bcrypt from '../libs/bcrypt.lib';

export const hash = async (password: string, saltRounds = 10) =>
  bcrypt.hash(password, saltRounds);

export const compare = async (password: string, hash: string) =>
  bcrypt.compare(password, hash);
