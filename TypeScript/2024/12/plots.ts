import { getPosStr } from '../common/helpers';

class Plot {
  private readonly _char: string;
  private _positions: Set<string> = new Set();
  private _minX: number = Number.MAX_SAFE_INTEGER;
  private _maxX: number = Number.MIN_SAFE_INTEGER;
  private _minY: number = Number.MAX_SAFE_INTEGER;
  private _maxY: number = Number.MIN_SAFE_INTEGER;

  constructor({ c, p }: { c: string; p: string[] }) {
    this._char = c;
    for (const pos of p) {
      const [x, y] = pos.split(',').map((n) => Number(n));
      if (x < this._minX) this._minX = x;
      if (x > this._maxX) this._maxX = x;
      if (y < this._minY) this._minY = y;
      if (y > this._maxY) this._maxY = y;
      this._positions.add(pos);
    }
  }

  public get area(): number {
    return this._positions.size;
  }

  public get perimiter(): number {
    let p = 0;
    for (const plot of this._positions) {
      const [x, y] = plot.split(',').map((n) => Number(n));
      const open = [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1],
      ].filter(([i, j]) => !this._positions.has(getPosStr(i, j)));
      p += open.length;
    }
    return p;
  }

  public get price(): number {
    return this.area * this.perimiter;
  }

  public get sides(): number {
    let sides = 0;
    for (let i = this._minX; i <= this._maxX; i++) {
      let foundLeft = false;
      let foundRight = false;
      for (let j = this._minY; j <= this._maxY; j++) {
        const posStr = getPosStr(i, j);
        const inPlot = this._positions.has(posStr);
        const hasLeft = this._positions.has(getPosStr(i - 1, j));
        const hasRight = this._positions.has(getPosStr(i + 1, j));
        if (!inPlot || hasLeft) {
          if (foundLeft) sides++;
          foundLeft = false;
        }
        if (!inPlot || hasRight) {
          if (foundRight) sides++;
          foundRight = false;
        }
        if (inPlot && !hasLeft) {
          foundLeft = true;
        }
        if (inPlot && !hasRight) {
          foundRight = true;
        }
      }
      if (foundLeft) sides++;
      if (foundRight) sides++;
    }
    for (let j = this._minY; j <= this._maxY; j++) {
      let foundUp = false;
      let foundBelow = false;
      for (let i = this._minX; i <= this._maxX; i++) {
        const posStr = getPosStr(i, j);
        const inPlot = this._positions.has(posStr);
        const hasUp = this._positions.has(getPosStr(i, j - 1));
        const hasBelow = this._positions.has(getPosStr(i, j + 1));
        if (!inPlot || hasUp) {
          if (foundUp) sides++;
          foundUp = false;
        }
        if (!inPlot || hasBelow) {
          if (foundBelow) sides++;
          foundBelow = false;
        }
        if (inPlot && !hasUp) {
          foundUp = true;
        }
        if (inPlot && !hasBelow) {
          foundBelow = true;
        }
      }
      if (foundUp) sides++;
      if (foundBelow) sides++;
    }
    return sides;
  }

  public get bulkPrice(): number {
    return this.area * this.sides;
  }
}

export class Plots {
  private readonly _height: number;
  private readonly _width: number;
  private _processed: Set<string> = new Set();
  private readonly _lines: string[];
  private _plots: Plot[] = [];

  constructor(lines: string[]) {
    this._lines = lines;
    this._height = lines.length;
    this._width = lines[0].length;
    for (let y = 0; y < this._height; y++) {
      for (let x = 0; x < this._width; x++) {
        const posStr = getPosStr(x, y);
        if (!this._processed.has(posStr)) {
          const char = lines[y][x];
          const neighbors = this.findNeighbors(x, y, char);
          for (const n of neighbors) {
            this._processed.add(n);
          }
          this._plots.push(
            new Plot({
              c: char,
              p: neighbors,
            }),
          );
        }
      }
    }
  }

  private findNeighbors(x: number, y: number, char: string) {
    const curr = getPosStr(x, y);
    const neighbors: Set<string> = new Set([curr]);
    const visited = new Set<string>([curr]);
    const buildNeighbors = (i: number, j: number, c: string) => {
      return [
        [i + 1, j],
        [i - 1, j],
        [i, j + 1],
        [i, j - 1],
      ].filter(([i, j]) => {
        return (
          i >= 0 &&
          i < this._width &&
          j >= 0 &&
          j < this._height &&
          this._lines[j][i] === c &&
          !visited.has(getPosStr(i, j))
        );
      });
    };
    const q: number[][] = buildNeighbors(x, y, char);
    while (q.length > 0) {
      const [i, j] = q.shift()!;
      const ps = getPosStr(i, j);
      neighbors.add(ps);
      const n = buildNeighbors(i, j, char);
      n.forEach((neighbor) => {
        visited.add(getPosStr(neighbor[0], neighbor[1]));
        q.push(neighbor);
      });
    }

    return Array.from(neighbors);
  }

  public get totalPrice() {
    return this._plots.reduce((acc, curr) => curr.price + acc, 0);
  }

  public get totalBulkPrice() {
    return this._plots.reduce((acc, curr) => curr.bulkPrice + acc, 0);
  }
}
