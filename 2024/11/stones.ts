export class Stones {
  private _stones: string[] = [];
  private _seenCount: Map<string, number> = new Map();

  constructor(line: string) {
    this._stones = line.split(' ');
  }

  public blink(numTimes: number = 1, stone: string): number {
    if (numTimes === 0) return 1;
    const cacheKey = `${numTimes}:${stone}`;
    if (this._seenCount.has(cacheKey)) return this._seenCount.get(cacheKey)!;
    if (stone === '0') {
      const count = this.blink(numTimes - 1, '1');
      this._seenCount.set(cacheKey, count);
      return count;
    }

    if (stone.length % 2 === 0) {
      const middle = stone.length / 2;
      const first = stone.slice(0, middle);
      const second = stone.slice(middle);
      const count =
        this.blink(numTimes - 1, parseInt(first, 10).toString()) +
        this.blink(numTimes - 1, parseInt(second, 10).toString());
      this._seenCount.set(cacheKey, count);
      return count;
    }

    const count = this.blink(
      numTimes - 1,
      (parseInt(stone, 10) * 2024).toString(),
    );
    this._seenCount.set(cacheKey, count);
    return count;
  }

  public getStoneCount(numBlinks: number): number {
    return this._stones.reduce((acc, curr) => this.blink(numBlinks, curr) + acc, 0);
  }
}
