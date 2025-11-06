import { describe, expect, test } from '@jest/globals';
import { RobotMap } from '../14/robotMap';

describe('Day 14', () => {
  describe('Part 1', () => {
    const h = 7;
    const w = 11;
    const lines = [
      'p=0,4 v=3,-3',
      'p=6,3 v=-1,-3',
      'p=10,3 v=-1,2',
      'p=2,0 v=2,-1',
      'p=0,0 v=1,3',
      'p=3,0 v=-2,-2',
      'p=7,6 v=-1,-3',
      'p=3,0 v=-1,-2',
      'p=9,3 v=2,3',
      'p=7,3 v=-1,2',
      'p=2,4 v=2,-3',
      'p=9,5 v=-3,-3',
    ];
    const rm = new RobotMap(lines, w, h);

    test('SF is 12', () => {
      rm.wait();
      expect(rm.getSafetyFactor()).toBe(12);
    });
  });
});
