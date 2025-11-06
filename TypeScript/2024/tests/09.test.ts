import { describe, expect, test } from '@jest/globals';
import { Disk } from '../09/disk';

describe('Day 09', () => {
  describe('Part 1', () => {
    const line = '2333133121414131402';
    const d = new Disk(line);

    test('checksum should be 1928', () => {
      d.fragment();
      expect(d.getChecksum()).toBe(1928);
    });
  });

  describe('Part 2', () => {
    const line = '2333133121414131402';
    const d = new Disk(line);

    test('checksum should be 2858', () => {
      d.compact();
      expect(d.getChecksum()).toBe(2858);
    });
  });
});
