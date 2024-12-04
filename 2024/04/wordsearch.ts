export class Wordsearch {
  private _lines: string[];
  private _Xs: number[][] = [];

  constructor(lines: string[]) {
    this._lines = lines;
    for (let y = 0; y < lines.length; y++) {
      for (let x = 0; x < lines[0].length; x++) {
        if (lines[y][x] === 'X') {
          this._Xs.push([x, y]);
        }
      }
    }
  }

  private r(x: number, y: number): boolean {
    return (
      this._lines[y][x] === 'X' &&
      this._lines[y][x + 1] === 'M' &&
      this._lines[y][x + 2] === 'A' &&
      this._lines[y][x + 3] === 'S'
    );
  }

  private l(x: number, y: number): boolean {
    return (
      this._lines[y][x] === 'X' &&
      this._lines[y][x - 1] === 'M' &&
      this._lines[y][x - 2] === 'A' &&
      this._lines[y][x - 3] === 'S'
    );
  }

  private d(x: number, y: number): boolean {
    return (
      !!this._lines[y + 1] &&
      !!this._lines[y + 2] &&
      !!this._lines[y + 3] &&
      this._lines[y][x] === 'X' &&
      this._lines[y + 1][x] === 'M' &&
      this._lines[y + 2][x] === 'A' &&
      this._lines[y + 3][x] === 'S'
    );
  }

  private u(x: number, y: number): boolean {
    return (
      !!this._lines[y - 1] &&
      !!this._lines[y - 2] &&
      !!this._lines[y - 3] &&
      this._lines[y][x] === 'X' &&
      this._lines[y - 1][x] === 'M' &&
      this._lines[y - 2][x] === 'A' &&
      this._lines[y - 3][x] === 'S'
    );
  }

  private ur(x: number, y: number): boolean {
    return (
      !!this._lines[y - 1] &&
      !!this._lines[y - 2] &&
      !!this._lines[y - 3] &&
      this._lines[y][x] === 'X' &&
      this._lines[y - 1][x + 1] === 'M' &&
      this._lines[y - 2][x + 2] === 'A' &&
      this._lines[y - 3][x + 3] === 'S'
    );
  }

  private dr(x: number, y: number): boolean {
    return (
      !!this._lines[y + 1] &&
      !!this._lines[y + 2] &&
      !!this._lines[y + 3] &&
      this._lines[y][x] === 'X' &&
      this._lines[y + 1][x + 1] === 'M' &&
      this._lines[y + 2][x + 2] === 'A' &&
      this._lines[y + 3][x + 3] === 'S'
    );
  }

  private ul(x: number, y: number): boolean {
    return (
      !!this._lines[y - 1] &&
      !!this._lines[y - 2] &&
      !!this._lines[y - 3] &&
      this._lines[y][x] === 'X' &&
      this._lines[y - 1][x - 1] === 'M' &&
      this._lines[y - 2][x - 2] === 'A' &&
      this._lines[y - 3][x - 3] === 'S'
    );
  }

  private dl(x: number, y: number): boolean {
    return (
      !!this._lines[y + 1] &&
      !!this._lines[y + 2] &&
      !!this._lines[y + 3] &&
      this._lines[y][x] === 'X' &&
      this._lines[y + 1][x - 1] === 'M' &&
      this._lines[y + 2][x - 2] === 'A' &&
      this._lines[y + 3][x - 3] === 'S'
    );
  }

  private countXmas(pos: number[]): number {
    const x = pos[0];
    const y = pos[1];
    return [
      this.r(x, y),
      this.l(x, y),
      this.d(x, y),
      this.u(x, y),
      this.ur(x, y),
      this.dr(x, y),
      this.ul(x, y),
      this.dl(x, y),
    ]
      .map((b) => (b ? 1 : 0))
      .filter((x) => x === 1).length;
  }

  public getCount() {
    let count = 0;
    for (const p of this._Xs) {
      count += this.countXmas(p);
    }
    return count;
  }
}

export class Wordsearch2 {
  private _lines: string[];
  private _As: number[][] = [];

  constructor(lines: string[]) {
    this._lines = lines;
    for (let y = 0; y < lines.length; y++) {
      for (let x = 0; x < lines[0].length; x++) {
        if (lines[y][x] === 'A') {
          this._As.push([x, y]);
        }
      }
    }
  }

  private isX_mas(pos: number[]) {
    const x = pos[0];
    const y = pos[1];
    return (
      !!this._lines[y - 1] &&
      !!this._lines[y + 1] &&
      ((this._lines[y - 1][x - 1] === 'M' &&
        this._lines[y + 1][x + 1] === 'S') ||
        (this._lines[y - 1][x - 1] === 'S' &&
          this._lines[y + 1][x + 1] === 'M')) &&
      ((this._lines[y + 1][x - 1] === 'M' &&
        this._lines[y - 1][x + 1] === 'S') ||
        (this._lines[y + 1][x - 1] === 'S' &&
          this._lines[y - 1][x + 1] === 'M'))
    );
  }

  public getCount() {
    let count = 0;
    for (const a of this._As) {
      if (this.isX_mas(a)) {
        count++;
      }
    }
    return count;
  }
}
