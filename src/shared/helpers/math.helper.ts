export const randomInt = (from = 0, to = 10) =>
  Math.floor(Math.random() * (to - from)) + from;
