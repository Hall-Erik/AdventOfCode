import { Room, Rooms } from '../04/rooms';
import { test, expect } from 'vitest';

test('aaaaa-bbb-z-y-x-123[abxyz] is a real room', () => {
  // aaaaa-bbb-z-y-x-123[abxyz] is a real room because the most common letters are a (5), b (3), and then a tie between x, y, and z, which are listed alphabetically.
  const r = new Room('aaaaa-bbb-z-y-x-123[abxyz]');
  expect(r.isReal).toBe(true);
});

test('a-b-c-d-e-f-g-h-987[abcde] is a real room', () => {
  // a-b-c-d-e-f-g-h-987[abcde] is a real room because although the letters are all tied (1 of each), the first five are listed alphabetically.
  const r = new Room('a-b-c-d-e-f-g-h-987[abcde]');
  expect(r.isReal).toBe(true);
});

test('not-a-real-room-404[oarel] is a real room', () => {
  const r = new Room('not-a-real-room-404[oarel]');
  expect(r.isReal).toBe(true);
});

test('totally-real-room-200[decoy] is not a real room', () => {
  const r = new Room('totally-real-room-200[decoy]');
  expect(r.isReal).toBe(false);
});

test('sum should be 1514', () => {
  const rooms = new Rooms([
    'aaaaa-bbb-z-y-x-123[abxyz]',
    'a-b-c-d-e-f-g-h-987[abcde]',
    'not-a-real-room-404[oarel]',
    'totally-real-room-200[decoy]',
  ]);
  expect(rooms.sumRealSectors()).toBe(1514);
});

test('real name of qzmt-zixmtkozy-ivhz-343 is very encrypted name', () => {
  const room = new Room('qzmt-zixmtkozy-ivhz-343[blah]');
  expect(room.realName).toBe('very encrypted name');
});
