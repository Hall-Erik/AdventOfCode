interface AntennaMap {
  [key: string]: string;
}

interface AntennaPos {
  [key: string]: number[][];
}

interface AntennaPair {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export class Map {
  private _antennaMap: AntennaMap = {};
  private _antennaPos: AntennaPos = {};
  private _antennaPairs: AntennaPair[] = [];
  private _podes: Set<string> = new Set();
  private _height: number;
  private _width: number;

  constructor(lines: string[]) {
    this._height = lines.length;
    this._width = lines[0].length;
    for (let y = 0; y < this._height; y++) {
      for (let x = 0; x < this._width; x++) {
        const c = lines[y][x];
        if (c !== '.') {
          this._antennaMap[`${x},${y}`] = c;
          const existing = this._antennaPos[c];
          if (existing) {
            this._antennaPos[c] = [...existing, [x, y]];
          } else {
            this._antennaPos[c] = [[x, y]];
          }
        }
      }
    }
    for (const v of Object.values(this._antennaPos)) {
      if (v.length > 1) {
        for (let i = 0; i < v.length - 1; i++) {
          for (let j = i + 1; j < v.length; j++) {
            const a = v[i];
            const b = v[j];
            this._antennaPairs.push({
              x1: a[0],
              y1: a[1],
              x2: b[0],
              y2: b[1],
            });
          }
        }
      }
    }
  }

  private isLine(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
  ): boolean {
    return (x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2 === 0;
  }

  private getDistance(x1: number, y1: number, x2: number, y2: number): number {
    const a = x1 - x2;
    const b = y1 - y2;
    return Math.sqrt(a * a + b * b);
  }

  public findePodes(ignoreDist: boolean = false) {
    for (let y = 0; y < this._height; y++) {
      for (let x = 0; x < this._width; x++) {
        if (
          this._antennaPairs.some((p) => {
            if (this.isLine(p.x1, p.y1, p.x2, p.y2, x, y)) {
              if (ignoreDist) return true;
              const d1 = this.getDistance(p.x1, p.y1, x, y);
              const d2 = this.getDistance(p.x2, p.y2, x, y);
              if (d1 > d2) {
                return d2 * 2 === d1;
              }
              if (d2 > d1) {
                return d1 * 2 === d2;
              }
            }
            return false;
          })
        ) {
          this._podes.add(`${x},${y}`);
        }
      }
    }
  }

  public totalPodes() {
    return this._podes.size;
  }

  public toString() {
    let s = '';
    for (let y = 0; y < this._height; y++) {
      for (let x = 0; x < this._width; x++) {
        const a = this._antennaMap[`${x},${y}`];
        if (a) {
          s += a;
        } else {
          s += '.';
        }
      }
      s += '\n';
    }
    return s;
  }
}
