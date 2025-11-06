import { describe, expect, test } from '@jest/globals';
import { Printer } from '../05/printer';

describe('Day 05', () => {
  const lines = [
    '47|53',
    '97|13',
    '97|61',
    '97|47',
    '75|29',
    '61|13',
    '75|53',
    '29|13',
    '97|29',
    '53|29',
    '61|53',
    '97|53',
    '61|29',
    '47|13',
    '75|47',
    '97|75',
    '47|61',
    '75|61',
    '47|29',
    '75|13',
    '53|13',
    '',
    '75,47,61,53,29',
    '97,61,53,29,13',
    '75,29,13',
    '75,97,47,61,53',
    '61,13,29',
    '97,13,75,29,47',
  ];
  const p = new Printer(lines);

  describe('Part 1', () => {
    test('only the first 3 updates are valid', () => {
      expect(p.getValidUpdates()).toEqual([
        [75, 47, 61, 53, 29],
        [97, 61, 53, 29, 13],
        [75, 29, 13],
      ]);
    });

    test('total should be 143', () => {
      expect(p.getMPNTotal()).toBe(143);
    });
  });

  describe('Part 2', () => {
    test('find and fix invalid updates', () => {
      expect(p.getFixInvalidUpdates()).toEqual([
        [97, 75, 47, 61, 53],
        [61, 29, 13],
        [97, 75, 47, 29, 13],
      ]);
    });

    test('total should be 123', () => {
      expect(p.getInvalidMPNTotal()).toBe(123);
    });
  });
});
