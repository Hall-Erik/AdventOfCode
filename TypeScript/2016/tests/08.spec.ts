import { Screen } from '../08/screen';
import { test, expect } from 'vitest';

test('should create a rect', () => {
  const s = new Screen(7, 3);
  s.processInstruction('rect 3x2');
  expect(s.toString()).toBe(['###....', '###....', '.......'].join('\n'));
});

test('should rotate column by 1', () => {
  const s = new Screen(7, 3);
  s.processInstruction('rect 3x2');
  s.processInstruction('rotate column x=1 by 1');
  expect(s.toString()).toBe(['#.#....', '###....', '.#.....'].join('\n'));
});

test('should rotate row by 4', () => {
  const s = new Screen(7, 3);
  s.processInstruction('rect 3x2');
  s.processInstruction('rotate column x=1 by 1');
  s.processInstruction('rotate row y=0 by 4');
  expect(s.toString()).toBe(['....#.#', '###....', '.#.....'].join('\n'));
});

test('should rotate column by 1 again', () => {
  const s = new Screen(7, 3);
  s.processInstruction('rect 3x2');
  s.processInstruction('rotate column x=1 by 1');
  s.processInstruction('rotate row y=0 by 4');
  s.processInstruction('rotate column x=1 by 1');
  expect(s.toString()).toBe(['.#..#.#', '#.#....', '.#.....'].join('\n'));
});

test('6 pixels should be lit', () => {
  const s = new Screen(7, 3);
  s.processInstruction('rect 3x2');
  s.processInstruction('rotate column x=1 by 1');
  s.processInstruction('rotate row y=0 by 4');
  s.processInstruction('rotate column x=1 by 1');
  expect(s.voltage).toBe(6);
});
