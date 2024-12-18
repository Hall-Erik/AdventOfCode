import { describe, expect, test } from '@jest/globals';
import { Topo } from '../10/topo';

describe('Day 10', () => {
  describe('Part 1', () => {
    test('should be 2', () => {
      const lines = [
        '...0...',
        '...1...',
        '...2...',
        '6543456',
        '7.....7',
        '8.....8',
        '9.....9',
      ];
      const t = new Topo(lines);
      expect(t.scoreTrailheads()).toBe(2);
    });

    test('should be 4', () => {
      const lines = [
        '..90..9',
        '...1.98',
        '...2..7',
        '6543456',
        '765.987',
        '876....',
        '987....',
      ];
      const t = new Topo(lines);
      expect(t.scoreTrailheads()).toBe(4);
    });

    test('should be 3', () => {
      const lines = [
        '10..9..',
        '2...8..',
        '3...7..',
        '4567654',
        '...8..3',
        '...9..2',
        '.....01',
      ];
      const t = new Topo(lines);
      expect(t.scoreTrailheads()).toBe(3);
    });

    test('should be 36', () => {
      const lines = [
        '89010123',
        '78121874',
        '87430965',
        '96549874',
        '45678903',
        '32019012',
        '01329801',
        '10456732',
      ];
      const t = new Topo(lines);
      expect(t.scoreTrailheads()).toBe(36);
    });
  });

  describe('Part 2', () => {
    test('should be 3', () => {
      const lines = [
        '.....0.',
        '..4321.',
        '..5..2.',
        '..6543.',
        '..7..4.',
        '..8765.',
        '..9....',
      ];
      const t = new Topo(lines);
      expect(t.rateTrailheads()).toBe(3);
    });

    test('should be 13', () => {
      const lines = [
        '..90..9',
        '...1.98',
        '...2..7',
        '6543456',
        '765.987',
        '876....',
        '987....',
      ];
      const t = new Topo(lines);
      expect(t.rateTrailheads()).toBe(13);
    });

    test('should be 227', () => {
      const lines = [
        '012345',
        '123456',
        '234567',
        '345678',
        '4.6789',
        '56789.',
      ];
      const t = new Topo(lines);
      expect(t.rateTrailheads()).toBe(227);
    });

    test('should be 81', () => {
      const lines = [
        '89010123',
        '78121874',
        '87430965',
        '96549874',
        '45678903',
        '32019012',
        '01329801',
        '10456732',
      ];
      const t = new Topo(lines);
      expect(t.rateTrailheads()).toBe(81);
    });
  });
});
