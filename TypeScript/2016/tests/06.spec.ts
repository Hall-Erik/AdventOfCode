import { Code } from '../06/code';
import { test, expect } from 'vitest';

const list = [
  'eedadn',
  'drvtee',
  'eandsr',
  'raavrd',
  'atevrs',
  'tsrnev',
  'sdttsa',
  'rasrtv',
  'nssdts',
  'ntnada',
  'svetve',
  'tesnvt',
  'vntsnd',
  'vrdear',
  'dvrsen',
  'enarar',
];
const c = new Code(list);

test('should decode to easter', () => {
  expect(c.decoded).toBe('easter');
});

test('should decode to advent', () => {
  expect(c.modifiedDecoded).toBe('advent');
});
