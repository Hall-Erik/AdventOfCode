import { describe, expect, test } from '@jest/globals';
import { Wordsearch, Wordsearch2 } from '../04/wordsearch';

describe('Day 04', () => {
  describe('Part 1', () => {
    const lines1 = ['..X...', '.SAMX.', '.A..A.', 'XMAS.S', '.X....'];
    const lines2 = [
      'MMMSXXMASM',
      'MSAMXMSMSA',
      'AMXSXMAAMM',
      'MSAMASMSMX',
      'XMASAMXAMM',
      'XXAMMXXAMA',
      'SMSMSASXSS',
      'SAXAMASAAA',
      'MAMMMXMMMM',
      'MXMXAXMASX',
    ];

    test('lines1 should have 4', () => {
      const w = new Wordsearch(lines1);
      expect(w.getCount()).toBe(4);
    });

    test('lines2 should have 18', () => {
      const w = new Wordsearch(lines2);
      expect(w.getCount()).toBe(18);
    });
  });

  describe('Part 2', () => {
    const lines1 = ['M.S', '.A.', 'M.S'];
    const lines2 = [
      '.M.S......',
      '..A..MSMS.',
      '.M.S.MAA..',
      '..A.ASMSM.',
      '.M.S.M....',
      '..........',
      'S.S.S.S.S.',
      '.A.A.A.A..',
      'M.M.M.M.M.',
      '..........',
    ];

    test('lines1 should be 1', () => {
      const w = new Wordsearch2(lines1);
      expect(w.getCount()).toBe(1);
    });

    test('lines2 should be 9', () => {
      const w = new Wordsearch2(lines2);
      expect(w.getCount()).toBe(9);
    });
  });
});
