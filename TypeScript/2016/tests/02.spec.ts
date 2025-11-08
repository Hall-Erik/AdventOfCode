import { Keypad } from '../02/keypad';
import { expect, test } from 'vitest';

const instructions = ['ULL', 'RRDDD', 'LURDL', 'UUUUD'];

test('code should be 1985', () => {
  const kp = new Keypad(1);
  kp.enterCode(instructions);
  expect(kp.code).toBe('1985');
});

test('code should be 5DB3', () => {
  const kp = new Keypad(2);
  kp.enterCode(instructions);
  expect(kp.code).toBe('5DB3');
});
