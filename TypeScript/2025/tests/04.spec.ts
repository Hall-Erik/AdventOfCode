import { test, expect } from 'vitest';
import { Warehouse } from '../04/warehouse';

const lines = [
  '..@@.@@@@.',
  '@@@.@.@.@@',
  '@@@@@.@.@@',
  '@.@@@@..@.',
  '@@.@@@@.@@',
  '.@@@@@@@.@',
  '.@.@.@.@@@',
  '@.@@@.@@@@',
  '.@@@@@@@@.',
  '@.@.@@@.@.',
];

test('there are 13 rolls of paper that can be accessed by a forklift', () => {
  const w = new Warehouse(lines);
  expect(w.getAccessibleRolls()).toBe(13);
});

test('there are a total 43 rolls of paper that can be removed', () => {
  const w = new Warehouse(lines);
  expect(w.findAndRemoveAccessibleRolls()).toBe(43);
});
