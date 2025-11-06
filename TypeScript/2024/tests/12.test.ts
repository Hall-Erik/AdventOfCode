import { describe, expect, test } from '@jest/globals';
import { Plots } from '../12/plots';

describe('Day 12', () => {
  describe('Part 1', () => {
    test('should be 140', () => {
      const lines = ['AAAA', 'BBCD', 'BBCC', 'EEEC'];
      const plots = new Plots(lines);
      expect(plots.totalPrice).toBe(140);
    });

    test('should be 772', () => {
      const lines = ['OOOOO', 'OXOXO', 'OOOOO', 'OXOXO', 'OOOOO'];
      const plots = new Plots(lines);
      expect(plots.totalPrice).toBe(772);
    });

    test('should be 1930', () => {
      const lines = [
        'RRRRIICCFF',
        'RRRRIICCCF',
        'VVRRRCCFFF',
        'VVRCCCJFFF',
        'VVVVCJJCFE',
        'VVIVCCJJEE',
        'VVIIICJJEE',
        'MIIIIIJJEE',
        'MIIISIJEEE',
        'MMMISSJEEE',
      ];
      const plots = new Plots(lines);
      expect(plots.totalPrice).toBe(1930);
    });
  });

  describe('Part 2', () => {
    test('should be 80', () => {
      const lines = ['AAAA', 'BBCD', 'BBCC', 'EEEC'];
      const plots = new Plots(lines);
      expect(plots.totalBulkPrice).toBe(80);
    });

    test('should be 436', () => {
      const lines = ['OOOOO', 'OXOXO', 'OOOOO', 'OXOXO', 'OOOOO'];
      const plots = new Plots(lines);
      expect(plots.totalBulkPrice).toBe(436);
    });

    test('should be 236', () => {
      const lines = ['EEEEE', 'EXXXX', 'EEEEE', 'EXXXX', 'EEEEE'];
      const plots = new Plots(lines);
      expect(plots.totalBulkPrice).toBe(236);
    });

    test('should be 368', () => {
      const lines = [
        'AAAAAA',
        'AAABBA',
        'AAABBA',
        'ABBAAA',
        'ABBAAA',
        'AAAAAA',
      ];
      const plots = new Plots(lines);
      expect(plots.totalBulkPrice).toBe(368);
    });

    test('should be 1206', () => {
      const lines = [
        'RRRRIICCFF',
        'RRRRIICCCF',
        'VVRRRCCFFF',
        'VVRCCCJFFF',
        'VVVVCJJCFE',
        'VVIVCCJJEE',
        'VVIIICJJEE',
        'MIIIIIJJEE',
        'MIIISIJEEE',
        'MMMISSJEEE',
      ];
      const plots = new Plots(lines);
      expect(plots.totalBulkPrice).toBe(1206);
    });
  });
});
