import { describe, expect, test } from 'vitest';
import { ServerRack } from '../11/serverRack';

describe('Part 1', () => {
  test('5 paths lead from you to out', () => {
    const lines = [
      'aaa: you hhh',
      'you: bbb ccc',
      'bbb: ddd eee',
      'ccc: ddd eee fff',
      'ddd: ggg',
      'eee: out',
      'fff: out',
      'ggg: out',
      'hhh: ccc fff iii',
      'iii: out',
    ];
    const s = new ServerRack(lines);
    expect(s.paths).toBe(5);
  });
});

describe('Part 2', () => {
  test('2 paths lead from svr to out and visit dac and fft', () => {
    const lines = [
      'svr: aaa bbb',
      'aaa: fft',
      'fft: ccc',
      'bbb: tty',
      'tty: ccc',
      'ccc: ddd eee',
      'ddd: hub',
      'hub: fff',
      'eee: dac',
      'dac: fff',
      'fff: ggg hhh',
      'ggg: out',
      'hhh: out',
    ];
    const s = new ServerRack(lines);
    expect(s.paths2).toBe(2);
  });
});
