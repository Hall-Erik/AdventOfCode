import { test, expect } from 'vitest';
import { Ingredients } from '../05/ingredients';

const lines = [
  '3-5',
  '10-14',
  '16-20',
  '12-18',
  '',
  '1',
  '5',
  '8',
  '11',
  '17',
  '32',
];

const i = new Ingredients(lines);

test('3 ingredients are fresh', () => {
  expect(i.freshCount).toBe(3);
});

test('', () => {
  expect(i.freshIngredientIdCount).toBe(14);
});
