import { describe, expect, test } from '@jest/globals';
import { Stones } from '../11/stones';

describe('Day 11', () => {
  const lines = ['125 17'];

  test('after 1 blink', () => {
    const s = new Stones(lines[0]);
    expect(s.getStoneCount(1)).toBe(3);
  });

  test('after 2 blinks', () => {
    const s = new Stones(lines[0]);
    expect(s.getStoneCount(2)).toBe(4);
  });

  test('after 3 blinks', () => {
    const s = new Stones(lines[0]);
    expect(s.getStoneCount(3)).toBe(5);
  });

  test('after 4 blinks', () => {
    const s = new Stones(lines[0]);
    expect(s.getStoneCount(4)).toBe(9);
  });

  test('after 5 blinks', () => {
    const s = new Stones(lines[0]);
    expect(s.getStoneCount(5)).toBe(13);
  });

  test('after 6 blinks', () => {
    const s = new Stones(lines[0]);
    expect(s.getStoneCount(6)).toBe(22);
  });

  test('after 25 blinks', () => {
    const s = new Stones(lines[0]);
    expect(s.getStoneCount(25)).toBe(55312);
  });
});
