export class Topo {
  private _grade = new Map<string, number>();
  private _zeroes: string[] = [];
  private _nines: Set<string> = new Set();
  private readonly _height: number;
  private readonly _width: number;

  constructor(lines: string[]) {
    this._height = lines.length;
    this._width = lines[0].length;
    for (let y = 0; y < this._height; y++) {
      for (let x = 0; x < this._width; x++) {
        const posStr = `${x},${y}`;
        const val = parseInt(lines[y][x]);
        this._grade.set(posStr, val);
        if (val === 0) {
          this._zeroes.push(posStr);
        }
      }
    }
  }

  private findNeighbors(posStr: string): string[] {
    const n: string[] = [];
    const [x, y] = posStr.split(',').map((n) => Number(n));
    const val = this._grade.get(posStr)!;

    let ps = `${x},${y - 1}`;
    if (y > 0 && this._grade.get(ps) === val + 1) {
      n.push(ps);
    }

    ps = `${x},${y + 1}`;
    if (y < this._height - 1 && this._grade.get(ps) === val + 1) {
      n.push(ps);
    }

    ps = `${x - 1},${y}`;
    if (x > 0 && this._grade.get(ps) === val + 1) {
      n.push(ps);
    }

    ps = `${x + 1},${y}`;
    if (x < this._width - 1 && this._grade.get(ps) === val + 1) {
      n.push(ps);
    }

    return n;
  }

  private score(posStr: string): number {
    const val = this._grade.get(posStr)!;
    if (val === 9) {
      if (this._nines.has(posStr)) return 0;
      this._nines.add(posStr);
      return 1;
    }
    const neighbors = this.findNeighbors(posStr);
    if (neighbors.length === 0) return 0;
    return neighbors
      .map((n) => this.score(n))
      .reduce((acc, curr) => acc + curr, 0);
  }

  public scoreTrailheads(): number {
    let sum = 0;
    for (const th of this._zeroes) {
      sum += this.score(th);
      this._nines.clear();
    }
    return sum;
  }

  private rate(posStr: string): number {
    const val = this._grade.get(posStr)!;
    if (val === 9) return 1;
    const neighbors = this.findNeighbors(posStr);
    if (neighbors.length === 0) return 0;
    return neighbors
      .map((n) => this.rate(n))
      .reduce((acc, curr) => acc + curr, 0);
  }

  public rateTrailheads(): number {
    let sum = 0;
    for (const th of this._zeroes) {
      sum += this.rate(th);
    }
    return sum;
  }
}
