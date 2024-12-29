import { describe, expect, test } from '@jest/globals';
import { Computer } from '../17/computer';

describe('Day 17', () => {
  describe('Part 1', () => {
    test('output should be 4,6,3,5,6,3,5,2,1,0', () => {
      const lines = [
        'Register A: 729',
        'Register B: 0',
        'Register C: 0',
        '',
        'Program: 0,1,5,4,3,0',
      ];
      const expectedOutput = '4,6,3,5,6,3,5,2,1,0';
      const c = new Computer(lines);
      expect(c.run()).toBe(expectedOutput);
    });
  });

  describe('Part 2', () => {
    test('should be 117440', () => {
      const lines = [
        'Register A: 2024',
        'Register B: 0',
        'Register C: 0',
        '',
        'Program: 0,3,5,4,3,0',
      ];
      const c = new Computer(lines);
      expect(c.findQuine()).toBe(117440);
    });
  });
});
