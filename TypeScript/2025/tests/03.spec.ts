import { test, expect, describe } from 'vitest';
import { BatteryBank, BatterySupply } from '../03/battery';

describe('Part 1', () => {
  test('In 987654321111111, you can make the largest joltage possible, 98, by turning on the first two batteries.', () => {
    const bb = new BatteryBank('987654321111111');
    expect(bb.getMaxJoltage()).toBe(98);
  });

  test('In 811111111111119, you can make the largest joltage possible by turning on the batteries labeled 8 and 9, producing 89 jolts.', () => {
    const bb = new BatteryBank('811111111111119');
    expect(bb.getMaxJoltage()).toBe(89);
  });

  test('In 234234234234278, you can make 78 by turning on the last two batteries (marked 7 and 8).', () => {
    const bb = new BatteryBank('234234234234278');
    expect(bb.getMaxJoltage()).toBe(78);
  });

  test('In 818181911112111, the largest joltage you can produce is 92.', () => {
    const bb = new BatteryBank('818181911112111');
    expect(bb.getMaxJoltage()).toBe(92);
  });

  test('Total Joltage should be 357', () => {
    const bs = new BatterySupply([
      '987654321111111',
      '811111111111119',
      '234234234234278',
      '818181911112111',
    ]);
    expect(bs.getTotalJoltage()).toBe(357);
  });
});

describe('Part 2', () => {
  test('In 987654321111111, the largest joltage can be found by turning on everything except some 1s at the end to produce 987654321111.', () => {
    const bb = new BatteryBank('987654321111111');
    expect(bb.getMax12Joltage()).toBe(987654321111);
  });

  test('In the digit sequence 811111111111119, the largest joltage can be found by turning on everything except some 1s, producing 811111111119.', () => {
    const bb = new BatteryBank('811111111111119');
    expect(bb.getMax12Joltage()).toBe(811111111119);
  });

  test('In 234234234234278, the largest joltage can be found by turning on everything except a 2 battery, a 3 battery, and another 2 battery near the start to produce 434234234278.', () => {
    const bb = new BatteryBank('234234234234278');
    expect(bb.getMax12Joltage()).toBe(434234234278);
  });

  test('In 818181911112111, the joltage 888911112111 is produced by turning on everything except some 1s near the front.', () => {
    const bb = new BatteryBank('818181911112111');
    expect(bb.getMax12Joltage()).toBe(888911112111);
  });

  test('Total 12 Joltage should be 3121910778619', () => {
    const bs = new BatterySupply([
      '987654321111111',
      '811111111111119',
      '234234234234278',
      '818181911112111',
    ]);
    expect(bs.getTotal12Joltage()).toBe(3121910778619);
  });
});
