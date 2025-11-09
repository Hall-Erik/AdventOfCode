import { Counter } from '../common/counter';
import { test, expect } from 'vitest';

test('most common is a', () => {
  const c = new Counter();
  c.add('a');
  c.add('a');
  c.add('a');
  c.add('b');
  c.add('b');
  c.add('c');
  expect(c.getMostCommon()).toBe('a');
});

test('most common is c', () => {
  const c = new Counter();
  c.add('a');
  c.add('a');
  c.add('a');
  c.add('b');
  c.add('b');
  c.add('c');
  expect(c.getLeastCommon()).toBe('c');
});
