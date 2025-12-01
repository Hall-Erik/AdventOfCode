import { expect, test } from 'vitest';
import { Safe } from '../01/safe';

test('should start with default settings', () => {
  const s = new Safe();
  expect(s.zeroes).toBe(0);
});

test('L1 should leave it at pos 99', () => {
  const s = new Safe(0);
  expect(s.pos).toBe(0);
  s.rotate('L1');
  expect(s.pos).toBe(99);
});

test('R20 should leave it at pos 20', () => {
  const s = new Safe(0);
  s.rotate('R20');
  expect(s.pos).toBe(20);
});

test('should end on 32', () => {
  const s = new Safe();
  s.rotate([
    'L68',
    'L30',
    'R48',
    'L5',
    'R60',
    'L55',
    'L1',
    'L99',
    'R14',
    'L82',
  ]);
  expect(s.pos).toBe(32);
});

test('should point at zero 3 times', () => {
  const s = new Safe();
  s.rotate([
    'L68',
    'L30',
    'R48',
    'L5',
    'R60',
    'L55',
    'L1',
    'L99',
    'R14',
    'L82',
  ]);
  expect(s.zeroes).toBe(3);
});

test('should cross zero 6 times', () => {
  const s = new Safe(50, true);
  s.rotate([
    'L68',
    'L30',
    'R48',
    'L5',
    'R60',
    'L55',
    'L1',
    'L99',
    'R14',
    'L82',
  ]);
  expect(s.zeroes).toBe(6);
});

test('should cross zero 6 times', () => {
  const s = new Safe(0, true);
  s.rotate('L206');
  expect(s.zeroes).toBe(2);
});
