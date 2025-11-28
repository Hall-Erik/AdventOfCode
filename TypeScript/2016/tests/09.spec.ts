import { Format } from '../09/format';
import { describe, test, expect } from 'vitest';

describe('Part 1', () => {
  test('ADVENT contains no markers and decompresses to itself with no changes, resulting in a decompressed length of 6.', () => {
    const f = new Format('ADVENT');
    const decoded = f.decodeLength();
    expect(decoded).toBe(6);
  });

  test('A(1x5)BC repeats only the B a total of 5 times, becoming ABBBBBC for a decompressed length of 7.', () => {
    const f = new Format('A(1x5)BC');
    const decoded = f.decodeLength();
    expect(decoded).toBe(7);
  });

  test('(3x3)XYZ becomes XYZXYZXYZ for a decompressed length of 9.', () => {
    const f = new Format('(3x3)XYZ');
    const decoded = f.decodeLength();
    expect(decoded).toBe(9);
  });

  test('A(2x2)BCD(2x2)EFG doubles the BC and EF, becoming ABCBCDEFEFG for a decompressed length of 11.', () => {
    const f = new Format('A(2x2)BCD(2x2)EFG');
    const decoded = f.decodeLength();
    expect(decoded).toBe(11);
  });

  test("(6x1)(1x3)A simply becomes (1x3)A - the (1x3) looks like a marker, but because it's within a data section of another marker, it is not treated any differently from the A that comes after it. It has a decompressed length of 6.", () => {
    const f = new Format('(6x1)(1x3)A');
    const decoded = f.decodeLength();
    expect(decoded).toBe(6);
  });

  test('X(8x2)(3x3)ABCY becomes X(3x3)ABC(3x3)ABCY (for a decompressed length of 18), because the decompressed data from the (8x2) marker (the (3x3)ABC) is skipped and not processed further.', () => {
    const f = new Format('X(8x2)(3x3)ABCY');
    const decoded = f.decodeLength();
    expect(decoded).toBe(18);
  });
});

describe('Part 2', () => {
  test('(3x3)XYZ still becomes XYZXYZXYZ, as the decompressed section contains no markers.', () => {
    const f = new Format('(3x3)XYZ');
    const decoded = f.fullDecodeLength();
    expect(decoded).toBe('XYZXYZXYZ'.length);
  });

  test('X(8x2)(3x3)ABCY becomes XABCABCABCABCABCABCY, because the decompressed data from the (8x2) marker is then further decompressed, thus triggering the (3x3) marker twice for a total of six ABC sequences.', () => {
    const f = new Format('X(8x2)(3x3)ABCY');
    const decoded = f.fullDecodeLength();
    expect(decoded).toBe('XABCABCABCABCABCABCY'.length);
  });

  test('(27x12)(20x12)(13x14)(7x10)(1x12)A decompresses into a string of A repeated 241920 times.', () => {
    const f = new Format('(27x12)(20x12)(13x14)(7x10)(1x12)A');
    const decoded = f.fullDecodeLength();
    expect(decoded).toBe(241920);
  });

  test('(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN becomes 445 characters long.', () => {
    const f = new Format(
      '(25x3)(3x3)ABC(2x3)XY(5x2)PQRSTX(18x9)(3x2)TWO(5x7)SEVEN',
    );
    const decoded = f.fullDecodeLength();
    expect(decoded).toBe(445);
  });
});
