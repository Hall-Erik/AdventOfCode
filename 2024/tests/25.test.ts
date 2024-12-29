import { describe, expect, test } from '@jest/globals';
import { Locks } from '../25/lock';

describe('Day 25', () => {
  describe('Part 1', () => {
    test('3 should fit', () => {
      const lines = [
        '#####',
        '.####',
        '.####',
        '.####',
        '.#.#.',
        '.#...',
        '.....',
        '',
        '#####',
        '##.##',
        '.#.##',
        '...##',
        '...#.',
        '...#.',
        '.....',
        '',
        '.....',
        '#....',
        '#....',
        '#...#',
        '#.#.#',
        '#.###',
        '#####',
        '',
        '.....',
        '.....',
        '#.#..',
        '###..',
        '###.#',
        '###.#',
        '#####',
        '',
        '.....',
        '.....',
        '.....',
        '#....',
        '#.#..',
        '#.#.#',
        '#####',
      ];
      const locks = new Locks(lines);
      expect(locks.getFitCount()).toBe(3);
    });
  });
});