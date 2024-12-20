import { describe, expect, test } from '@jest/globals';
import { MemorySpace } from '../18/memorySpace';

describe('Day 18', () => {
  const lines = [
    '5,4',
    '4,2',
    '4,5',
    '3,0',
    '2,1',
    '6,3',
    '2,4',
    '1,5',
    '0,6',
    '3,3',
    '2,6',
    '5,1',
    '1,2',
    '5,5',
    '2,5',
    '6,5',
    '1,4',
    '0,4',
    '6,4',
    '1,1',
    '6,1',
    '1,0',
    '0,5',
    '1,6',
    '2,0',
  ];

  describe('Part 1', () => {
    test('should take 22 steps after 12 bytes dropped', () => {
      const m = new MemorySpace(lines, 7, 7);
      m.dropBytes(12);
      expect(m.getStepsToExit()).toBe(22);
    });
  });

  describe('Part 2', () => {
    test('6,1 cuts off the exit', () => {
      const m = new MemorySpace(lines, 7, 7);
      expect(m.findLastByte()).toBe('6,1');
    });
  });
});
