import { describe, test, expect } from 'vitest';
import { Bots } from '../10/bots';

describe.only('Part 1', () => {
  const instructions = [
    'value 5 goes to bot 2',
    'bot 2 gives low to bot 1 and high to bot 0',
    'value 3 goes to bot 1',
    'bot 1 gives low to output 1 and high to bot 0',
    'bot 0 gives low to output 2 and high to output 0',
    'value 2 goes to bot 2',
  ];

  test('Bot 2 compares vals 5 and 2', () => {
    const bots = new Bots(instructions);
    expect(bots.getBotNameByVals(5, 2)).toBe('2');
  });
});
