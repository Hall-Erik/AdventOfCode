import { test, expect } from 'vitest';
import { CMath, CMathPart2 } from '../06/cMath';

const lines = [
  '123 328  51 64 ',
  ' 45 64  387 23 ',
  '  6 98  215 314',
  '*   +   *   +  ',
];

test('grand total should be 4277556', () => {
  const c = new CMath(lines);
  expect(c.grandTotal).toBe(4277556);
});

test('r to l grand total should be 3263827', () => {
  const c = new CMathPart2(lines);
  expect(c.grandTotal).toBe(3263827);
});
