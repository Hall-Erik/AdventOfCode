import { IpV7 } from '../07/ipv7';
import { expect, test } from 'vitest';

test('abba[mnop]qrst supports TLS', () => {
  const ip = new IpV7('abba[mnop]qrst');
  expect(ip.isTls).toBe(true);
});

test('abcd[bddb]xyyx does not support TLS', () => {
  const ip = new IpV7('abcd[bddb]xyyx');
  expect(ip.isTls).toBe(false);
});

test('aaaa[qwer]tyui does not support TLS', () => {
  const ip = new IpV7('aaaa[qwer]tyui');
  expect(ip.isTls).toBe(false);
});

test('ioxxoj[asdfgh]zxcvbn supports TLS', () => {
  const ip = new IpV7('ioxxoj[asdfgh]zxcvbn');
  expect(ip.isTls).toBe(true);
});

test('aba[bab]xyz supports SSL', () => {
  const ip = new IpV7('aba[bab]xyz');
  expect(ip.isSsl).toBe(true);
});

test('xyx[xyx]xyx does not support SSL', () => {
  const ip = new IpV7('xyx[xyx]xyx');
  expect(ip.isSsl).toBe(false);
});

test('aaa[kek]eke supports SSL', () => {
  const ip = new IpV7('aaa[kek]eke');
  expect(ip.isSsl).toBe(true);
});

test('zazbz[bzb]cdb supports SSL', () => {
  const ip = new IpV7('zazbz[bzb]cdb');
  expect(ip.isSsl).toBe(true);
});
