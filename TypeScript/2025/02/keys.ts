export class KeyRange {
  private readonly pattern: RegExp;
  private invalids: number[] = [];
  public readonly isValid: boolean;

  public constructor(range: string, usePattern: 1 | 2 = 1) {
    this.pattern = usePattern === 1 ? /^(\d+)\1$/ : /^(\d+)\1+$/;

    const [start, stop] = range.split('-').map((s) => parseInt(s));
    for (let i = start; i <= stop; i++) {
      const s = `${i}`;
      if (this.pattern.test(s)) {
        this.invalids.push(i);
      }
    }

    this.isValid = this.invalids.length === 0;
  }

  public get invalidNums(): number[] {
    return [...this.invalids];
  }

  public get invalidSum(): number {
    return this.invalids.reduce((prev, curr) => prev + curr, 0);
  }
}

export class KeyChecker {
  private readonly keyRanges: KeyRange[];

  public constructor(list: string, usePattern: 1 | 2 = 1) {
    this.keyRanges = list.split(',').map((l) => new KeyRange(l, usePattern));
  }

  public get invalidSum(): number {
    return this.keyRanges
      .filter((r) => !r.isValid)
      .map((r) => r.invalidSum)
      .reduce((prev, curr) => prev + curr, 0);
  }
}
