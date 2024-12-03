import { describe, expect, test } from '@jest/globals';
import { Computer } from '../03/computer';

describe('Day 03', () => {
  describe('Part 1', () => {
    const line =
      'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))';
    test('result is 161', () => {
      expect(Computer.process(line)).toBe(161);
    });
  });

  describe('Part 2', () => {
    const line =
      "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))";
    const computer = new Computer();
    test('result is 48', () => {
      expect(computer.processConditionally(line)).toBe(48);
    });
  });
});
