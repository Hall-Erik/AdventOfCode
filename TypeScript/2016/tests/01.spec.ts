import { beforeEach, test, expect } from 'vitest';
import { City } from '../01/city';

let c: City;

beforeEach(() => {
  c = new City();
});

test('Following R2, L3 leaves you 2 blocks East and 3 blocks North, or 5 blocks away.', () => {
  const instructions = ['R2', 'L3'];
  c.followInstructions(instructions);
  expect(c.dist).toBe(5);
});

test('R2, R2, R2 leaves you 2 blocks due South of your starting position, which is 2 blocks away.', () => {
  const instructions = ['R2', 'R2', 'R2'];
  c.followInstructions(instructions);
  expect(c.dist).toBe(2);
});

test('R5, L5, R5, R3 leaves you 12 blocks away.', () => {
  const instructions = ['R5', 'L5', 'R5', 'R3'];
  c.followInstructions(instructions);
  expect(c.dist).toBe(12);
});

test('if your instructions are R8, R4, R4, R8, the first location you visit twice is 4 blocks away, due East.', () => {
  const instructions = ['R8', 'R4', 'R4', 'R8'];
  c.followInstructions(instructions, true);
  expect(c.dist).toBe(4);
});
