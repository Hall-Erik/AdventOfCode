import { describe, test, expect } from 'vitest';
import { Roof } from '../09/roof';

describe('9 part 1', () => {
  test('should have area of 50', () => {
    const lines = ['7,1', '11,1', '11,7', '9,7', '9,5', '2,5', '2,3', '7,3'];
    const roof = new Roof(lines);
    expect(roof.largestArea).toBe(50);
  });
});

describe('9 part 2', () => {
  test('should have area of 24', () => {
    const lines = ['7,1', '11,1', '11,7', '9,7', '9,5', '2,5', '2,3', '7,3'];
    const roof = new Roof(lines);
    expect(roof.largestArea2).toBe(24);
  });
});
