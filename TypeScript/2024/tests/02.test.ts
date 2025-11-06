import { Report } from '../02/reports';
import { describe, expect, test } from '@jest/globals';

describe('Day 02', () => {
  const lines = [
    '7 6 4 2 1',
    '1 2 7 8 9',
    '9 7 6 2 1',
    '1 3 2 4 5',
    '8 6 4 4 1',
    '1 3 6 7 9',
  ];

  describe('Part 1', () => {
    const reports = lines.map((l) => new Report(l));
    test('0 is safe', () => {
      expect(reports[0].isSafe()).toBe(true);
    });

    test('1 is unsafe', () => {
      expect(reports[1].isSafe()).toBe(false);
    });

    test('2 is unsafe', () => {
      expect(reports[2].isSafe()).toBe(false);
    });

    test('3 is unsafe', () => {
      expect(reports[3].isSafe()).toBe(false);
    });

    test('4 is unsafe', () => {
      expect(reports[4].isSafe()).toBe(false);
    });

    test('5 is safe', () => {
      expect(reports[5].isSafe()).toBe(true);
    });
  });

  describe('Part 2', () => {
    const reports = lines.map((l) => new Report(l, true));
    test('0 is safe', () => {
      expect(reports[0].isSafe()).toBe(true);
    });

    test('1 is unsafe', () => {
      expect(reports[1].isSafe()).toBe(false);
    });

    test('2 is unsafe', () => {
      expect(reports[2].isSafe()).toBe(false);
    });

    test('3 is safe', () => {
      expect(reports[3].isSafe()).toBe(true);
    });

    test('4 is safe', () => {
      expect(reports[4].isSafe()).toBe(true);
    });

    test('5 is safe', () => {
      expect(reports[5].isSafe()).toBe(true);
    });
  });
});
