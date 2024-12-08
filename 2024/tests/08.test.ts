import { describe, expect, test } from '@jest/globals';
import { Map } from '../08/map';

describe('Day 08', () => {
  describe('Part 1', () => {
    test('has 2 antinodes', () => {
      const lines = [
        '..........',
        '..........',
        '..........',
        '....a.....',
        '..........',
        '.....a....',
        '..........',
        '..........',
        '..........',
        '..........',
      ];
      const m = new Map(lines);
      m.findePodes();
      expect(m.totalPodes()).toBe(2);
    });

    test('has 4 antipodes', () => {
      const lines = [
        '..........',
        '..........',
        '..........',
        '....a.....',
        '........a.',
        '.....a....',
        '..........',
        '..........',
        '..........',
        '..........',
      ];
      const m = new Map(lines);
      m.findePodes();
      expect(m.totalPodes()).toBe(4);
    });

    test('has 4 antipodes', () => {
      const lines = [
        '..........',
        '..........',
        '..........',
        '....a.....',
        '........a.',
        '.....a....',
        '..........',
        '......A...',
        '..........',
        '..........',
      ];
      const m = new Map(lines);
      m.findePodes();
      expect(m.totalPodes()).toBe(4);
    });

    test('has 14 antipodes', () => {
      const lines = [
        '............',
        '........0...',
        '.....0......',
        '.......0....',
        '....0.......',
        '......A.....',
        '............',
        '............',
        '........A...',
        '.........A..',
        '............',
        '............',
      ];
      const m = new Map(lines);
      m.findePodes();
      expect(m.totalPodes()).toBe(14);
    });
  });

  describe('Part 2', () => {
    test('has 9 antipodes', () => {
      const lines = [
        'T.........',
        '...T......',
        '.T........',
        '..........',
        '..........',
        '..........',
        '..........',
        '..........',
        '..........',
        '..........',
      ];
      const m = new Map(lines);
      m.findePodes(true);
      expect(m.totalPodes()).toBe(9);
    });

    test('has 34 antipodes', () => {
      const lines = [
        '............',
        '........0...',
        '.....0......',
        '.......0....',
        '....0.......',
        '......A.....',
        '............',
        '............',
        '........A...',
        '.........A..',
        '............',
        '............',
      ];
      const m = new Map(lines);
      m.findePodes(true);
      expect(m.totalPodes()).toBe(34);
    });
  });
});
