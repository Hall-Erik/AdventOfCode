import { describe, expect, test } from '@jest/globals';
import { Lists } from '../01/list';

describe('Day 01', () => {
  const lines = ['3   4', '4   3', '2   5', '1   3', '3   9', '3   3'];

  const lists = new Lists(lines);

  test('total distance is 11', () => {
    expect(lists.getTotalDistance()).toBe(11);
  });

  test('similarity score is 31', () => {
    expect(lists.getSimilarityScore()).toBe(31);
  });
});
