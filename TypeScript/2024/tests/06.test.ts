import { describe, expect, test } from '@jest/globals';
import { Map, Maps } from '../06/map';

describe('Day 06', () => {
  const lines = [
    '....#.....',
    '.........#',
    '..........',
    '..#.......',
    '.......#..',
    '..........',
    '.#..^.....',
    '........#.',
    '#.........',
    '......#...',
  ];

  describe('Part 1', () => {
    test('visited should be 41', () => {
      const map = new Map(lines);
      map.moveUntilOOB();
      expect(map.getTotalVisited()).toBe(41);
    });
  });

  describe('Part 2', () => {
    test('6 possible loops', () => {
      const map = new Maps(lines);
      // ...
      expect(map.getTotalPossibleLoops()).toBe(6);
    });
  });
});
