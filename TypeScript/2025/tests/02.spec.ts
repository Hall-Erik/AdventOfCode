import { describe, expect, test } from 'vitest';
import { KeyRange, KeyChecker } from '../02/keys';

describe('Part 1', () => {
  test('11 and 22 are invalid', () => {
    const k = new KeyRange('11-22');
    const i = k.invalidNums;
    expect(i.length).toBe(2);
    expect(i).containSubset([11, 22]);
  });

  test('99 is invalid', () => {
    const k = new KeyRange('95-115');
    const i = k.invalidNums;
    expect(i.length).toBe(1);
    expect(i).containSubset([99]);
  });

  test('1010 is invalid', () => {
    const k = new KeyRange('998-1012');
    const i = k.invalidNums;
    expect(i.length).toBe(1);
    expect(i).containSubset([1010]);
  });

  test('1188511885 is invalid', () => {
    const k = new KeyRange('1188511880-1188511890');
    const i = k.invalidNums;
    expect(i.length).toBe(1);
    expect(i).containSubset([1188511885]);
  });

  test('222222 is invalid', () => {
    const k = new KeyRange('222220-222224');
    const i = k.invalidNums;
    expect(i.length).toBe(1);
    expect(i).containSubset([222222]);
  });

  test('446446 is invalid', () => {
    const k = new KeyRange('446443-446449');
    const i = k.invalidNums;
    expect(i.length).toBe(1);
    expect(i).containSubset([446446]);
  });

  test('38593859 is invalid', () => {
    const k = new KeyRange('38593856-38593862');
    const i = k.invalidNums;
    expect(i.length).toBe(1);
    expect(i).containSubset([38593859]);
  });

  test('1698522-1698528 is valid', () => {
    const k = new KeyRange('1698522-1698528');
    const i = k.invalidNums;
    expect(i.length).toBe(0);
    expect(i).containSubset([]);
  });

  test('565653-565659 is valid', () => {
    const k = new KeyRange('565653-565659');
    const i = k.invalidNums;
    expect(i.length).toBe(0);
    expect(i).containSubset([]);
  });

  test('824824821-824824827 is valid', () => {
    const k = new KeyRange('824824821-824824827');
    const i = k.invalidNums;
    expect(i.length).toBe(0);
    expect(i).containSubset([]);
  });

  test('2121212118-2121212124 is valid', () => {
    const k = new KeyRange('2121212118-2121212124');
    const i = k.invalidNums;
    expect(i.length).toBe(0);
    expect(i).containSubset([]);
  });

  test('Invalid ID sum is 1227775554', () => {
    const kc = new KeyChecker(
      '11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124',
    );
    expect(kc.invalidSum).toBe(1227775554);
  });
});

describe('Part 2', () => {
  test('11-22 still has two invalid IDs, 11 and 22.', () => {
    const k = new KeyRange('11-22', 2);
    const i = k.invalidNums;
    expect(i.length).toBe(2);
    expect(i).containSubset([11, 22]);
  });

  test('95-115 now has two invalid IDs, 99 and 111.', () => {
    const k = new KeyRange('95-115', 2);
    const i = k.invalidNums;
    expect(i.length).toBe(2);
    expect(i).containSubset([99, 111]);
  });

  test('998-1012 now has two invalid IDs, 999 and 1010.', () => {
    const k = new KeyRange('998-1012', 2);
    const i = k.invalidNums;
    expect(i.length).toBe(2);
    expect(i).containSubset([999, 1010]);
  });

  test('1188511880-1188511890 still has one invalid ID, 1188511885.', () => {
    const k = new KeyRange('1188511880-1188511890', 2);
    const i = k.invalidNums;
    expect(i.length).toBe(1);
    expect(i).containSubset([1188511885]);
  });

  test('222220-222224 still has one invalid ID, 222222.', () => {
    const k = new KeyRange('222220-222224', 2);
    const i = k.invalidNums;
    expect(i.length).toBe(1);
    expect(i).containSubset([222222]);
  });

  test('1698522-1698528 still contains no invalid IDs.', () => {
    const k = new KeyRange('1698522-1698528', 2);
    const i = k.invalidNums;
    expect(i.length).toBe(0);
    expect(i).containSubset([]);
  });

  test('446443-446449 still has one invalid ID, 446446.', () => {
    const k = new KeyRange('446443-446449', 2);
    const i = k.invalidNums;
    expect(i.length).toBe(1);
    expect(i).containSubset([446446]);
  });

  test('38593856-38593862 still has one invalid ID, 38593859.', () => {
    const k = new KeyRange('38593856-38593862', 2);
    const i = k.invalidNums;
    expect(i.length).toBe(1);
    expect(i).containSubset([38593859]);
  });

  test('565653-565659 now has one invalid ID, 565656.', () => {
    const k = new KeyRange('565653-565659', 2);
    const i = k.invalidNums;
    expect(i.length).toBe(1);
    expect(i).containSubset([565656]);
  });

  test('824824821-824824827 now has one invalid ID, 824824824.', () => {
    const k = new KeyRange('824824821-824824827', 2);
    const i = k.invalidNums;
    expect(i.length).toBe(1);
    expect(i).containSubset([824824824]);
  });

  test('2121212118-2121212124 now has one invalid ID, 2121212121.', () => {
    const k = new KeyRange('2121212118-2121212124', 2);
    const i = k.invalidNums;
    expect(i.length).toBe(1);
    expect(i).containSubset([2121212121]);
  });

  test('Adding up all the invalid IDs in this example produces 4174379265.', () => {
    const kc = new KeyChecker(
      '11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124',
      2,
    );
    expect(kc.invalidSum).toBe(4174379265);
  });
});
