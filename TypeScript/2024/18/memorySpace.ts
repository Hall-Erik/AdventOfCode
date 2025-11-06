interface Node {
  pos: string;
  dist: number;
}

export class MemorySpace {
  private readonly _height: number;
  private readonly _width: number;
  private readonly _startPosStr: string = `0,0`;
  private readonly _exitPosStr: string;
  private readonly _lines: string[];
  private _bytes: Set<string> = new Set();
  private _visited: Set<string> = new Set();

  constructor(lines: string[], height: number = 71, width: number = 71) {
    this._height = height;
    this._width = width;
    this._exitPosStr = `${this._width - 1},${this._height - 1}`;
    this._lines = lines;
  }

  public dropBytes(count: number) {
    this._bytes.clear();
    for (let i = 0; i < count; i++) {
      const line = this._lines[i];
      this._bytes.add(line);
    }
  }

  private getNeighbors(posStr: string): string[] {
    const [x, y] = posStr.split(',').map((n) => Number(n));

    const posToStr = (x: number, y: number) => `${x},${y}`;

    const safe = (x: number, y: number): boolean => {
      if (x >= this._width || x < 0) return false;
      if (y >= this._height || y < 0) return false;
      const pos: string = posToStr(x, y);
      return !this._visited.has(pos) && !this._bytes.has(pos);
    };

    return [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
    ]
      .filter((a) => safe(a[0], a[1]))
      .map((a) => posToStr(a[0], a[1]));
  }

  private findExit(node: Node): number {
    const q: Node[] = [node];
    const steps = Number.MAX_SAFE_INTEGER;
    let lastDist = 0;
    this._visited.add(node.pos);
    while (q.length > 0) {
      const n = q.shift()!;
      if (n.dist > lastDist) {
        lastDist = n.dist;
      }
      if (n.pos === this._exitPosStr && n.dist < steps) {
        return n.dist;
      }
      const neighbors = this.getNeighbors(n.pos);
      neighbors.forEach((neighbor) => this._visited.add(neighbor));
      q.push(
        ...neighbors.map((neighbor) => ({ pos: neighbor, dist: n.dist + 1 })),
      );
    }
    return steps;
  }

  public getStepsToExit(): number {
    this._visited.clear();
    return this.findExit({ pos: this._startPosStr, dist: 0 });
  }

  public findLastByte(): string {
    this._bytes.clear();
    for (const line of this._lines) {
      this._bytes.add(line);
      if (this.getStepsToExit() === Number.MAX_SAFE_INTEGER) {
        return line;
      }
    }
    return '';
  }

  public toString(): string {
    let s = '';
    for (let y = 0; y < this._height; y++) {
      for (let x = 0; x < this._width; x++) {
        const posStr = `${x},${y}`;
        if (this._bytes.has(posStr)) {
          s += '#';
        } else if (this._visited.has(posStr)) {
          s += '0';
        } else {
          s += '.';
        }
      }
      s += '\n';
    }
    s += '\n\n' + `${this._width},${this._height}: ${this._exitPosStr}`;
    return s;
  }
}
