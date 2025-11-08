import { Triangle, Triangles } from '../03/triangle';
import { expect, test } from 'vitest';

const list = [
  [101, 301, 501],
  [102, 302, 502],
  [103, 303, 503],
  [201, 401, 601],
  [202, 402, 602],
  [203, 403, 603],
];

const triangles = new Triangles(list);

test('5 10 25 is an invalid triangle', () => {
  const t = new Triangle(5, 10, 25);
  expect(t.isValid()).toBe(false);
});

test('15 15 25 is valid', () => {
  const t = new Triangle(15, 15, 25);
  expect(t.isValid()).toBe(true);
});

test('3 horizontal triangles are valid', () => {
  expect(triangles.countValidTrianglesHorizontal()).toBe(3);
});

test('6 vertical triangles are valid', () => {
  expect(triangles.countValidTrianglesVertical()).toBe(6);
});
