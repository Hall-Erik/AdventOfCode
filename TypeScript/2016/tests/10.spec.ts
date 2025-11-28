import { describe, test, expect } from 'vitest';
import { Bots } from '../10/bots';

const instructions = [
  'value 5 goes to bot 2',
  'bot 2 gives low to bot 1 and high to bot 0',
  'value 3 goes to bot 1',
  'bot 1 gives low to output 1 and high to bot 0',
  'bot 0 gives low to output 2 and high to output 0',
  'value 2 goes to bot 2',
];

const bots = new Bots(instructions);

test('Bot 2 compares vals 5 and 2', () => {
  expect(bots.getBotNameByVals(5, 2)).toBe('2');
});

test('Bot 1 compares vals 2 and 3', () => {
  expect(bots.getBotNameByVals(2, 3)).toBe('1');
});

test('Bot 0 compares vals 3 and 5', () => {
  expect(bots.getBotNameByVals(3, 5)).toBe('0');
});

test('Multiple of outputs is 30', () => {
  expect(bots.getOutputsMultiplied()).toBe(30);
});
