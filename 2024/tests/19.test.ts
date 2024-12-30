import { describe, expect, test } from '@jest/globals';
import { Towels } from '../19/towels';

describe('Day 19', () => {
  describe('Part 1', () => {
    test('should be 6', () => {
      const lines = [
        'r, wr, b, g, bwu, rb, gb, br',
        '',
        'brwrr',
        'bggr',
        'gbbr',
        'rrbgbr',
        'ubwu',
        'bwurrg',
        'brgr',
        'bbrgwb',
      ];
      const t = new Towels(lines);
      expect(t.countPossible()).toBe(6);
    });
  });

  describe('Part 1', () => {
    test('should be 16', () => {
      const lines = [
        'r, wr, b, g, bwu, rb, gb, br',
        '',
        'brwrr',
        'bggr',
        'gbbr',
        'rrbgbr',
        'ubwu',
        'bwurrg',
        'brgr',
        'bbrgwb',
      ];
      const t = new Towels(lines);
      expect(t.countPossibleCombos()).toBe(16);
    });
  });
});
