import { expect, test } from 'vitest';
import { Manifold, QuantumManifold } from '../07/manifold';

const lines = [
  '.......S.......',
  '...............',
  '.......^.......',
  '...............',
  '......^.^......',
  '...............',
  '.....^.^.^.....',
  '...............',
  '....^.^...^....',
  '...............',
  '...^.^...^.^...',
  '...............',
  '..^...^.....^..',
  '...............',
  '.^.^.^.^.^...^.',
  '...............',
];

test('should split 21 times', () => {
  const m = new Manifold([...lines]);
  expect(m.splitCount).toBe(21);
});

test('total timelines should be 40', () => {
  const m = new QuantumManifold([...lines]);
  expect(m.timelineCount).toBe(40);
});
