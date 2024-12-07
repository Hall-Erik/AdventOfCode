interface ObstaclePos {
  [key: string]: string;
}

interface GuardPos {
  x: number;
  y: number;
  facing: 'l' | 'r' | 'u' | 'd';
}

interface Visited {
    [key: string]: 'l' | 'r' | 'u' | 'd';
}

export class Map {
  private _obstacles: ObstaclePos = {};
  private _guard: GuardPos = {
    x: 0,
    y: 0,
    facing: 'l',
  };
  private _visited: Visited = {};
  private _width: number;
  private _hehght: number;
  private _done: boolean = false;
  private _isLoop: boolean = false;

  constructor(lines: string[], extraObst?: string) {
    this._hehght = lines.length;
    this._width = lines[0].length;

    for (let y = 0; y < this._hehght; y++) {
      for (let x = 0; x < this._width; x++) {
        const c = lines[y][x];
        const stringPos = [x, y].join(',');
        switch (c) {
          case '^':
            this._guard.facing = 'u';
            this._guard.x = x;
            this._guard.y = y;
            this._visited[stringPos] = 'u';
            break;
          case 'v':
            this._guard.facing = 'd';
            this._guard.x = x;
            this._guard.y = y;
            this._visited[stringPos] = 'd';
            break;
          case '>':
            this._guard.facing = 'r';
            this._guard.x = x;
            this._guard.y = y;
            this._visited[stringPos] = 'r';
            break;
          case '<':
            this._guard.facing = 'l';
            this._guard.x = x;
            this._guard.y = y;
            this._visited[stringPos] = 'l';
            break;
          case '#':
            this._obstacles[stringPos] = '#';
            break;
          default:
            break;
        }
      }
    }

    if (extraObst) {
        this._obstacles[extraObst] = '#';
    }
  }

  private isOOB(x: number, y: number): boolean {
    return x < 0 || x >= this._width || y < 0 || y >= this._hehght;
  }

  private turnRight() {
    switch (this._guard.facing) {
      case 'u':
        this._guard.facing = 'r';
        break;
      case 'd':
        this._guard.facing = 'l';
        break;
      case 'l':
        this._guard.facing = 'u';
        break;
      case 'r':
        this._guard.facing = 'd';
        break;
      default:
        throw new Error('💩');
    }
  }

  public move() {
    let x;
    let y;

    switch (this._guard.facing) {
      case 'u':
        x = this._guard.x;
        y = this._guard.y - 1;
        break;
      case 'd':
        x = this._guard.x;
        y = this._guard.y + 1;
        break;
      case 'l':
        x = this._guard.x - 1;
        y = this._guard.y;
        break;
      case 'r':
        x = this._guard.x + 1;
        y = this._guard.y;
        break;
      default:
        throw new Error('💩');
    }

    if (this.isOOB(x, y)) {
      this._done = true;
      return;
    }
    
    const stringPos = [x, y].join(',');

    if (this._visited[stringPos] === this._guard.facing) {
        this._isLoop = true;
        this._done = true;
        return;
    }

    if (this._obstacles[stringPos] === '#') {
      this.turnRight();
      return;
    }

    this._guard.x = x;
    this._guard.y = y;

    this._visited[stringPos] = this._guard.facing;
  }

  public moveUntilOOB() {
    while (!this._done) {
      this.move();
    }
  }

  public getTotalVisited() {
    return Object.keys(this._visited).length;    
  }

  public getVisited() {
    return Object.keys(this._visited);
  }

  public isLoop() {
    return this._isLoop;
  }

  public toString(): string {
    let s = '';
    for (let y = 0; y < this._hehght; y++) {
      for (let x = 0; x < this._width; x++) {
        const stringPos = [x, y].join(',');
        if (this._guard.x === x && this._guard.y === y) {
          s += 'G';
          continue;
        }
        if (!!this._visited[stringPos]) {
          s += 'X';
          continue;
        }
        if (this._obstacles[stringPos] === '#') {
          s += '#';
          continue;
        }
        s += '.';
      }
      s += '\n';
    }
    return s;
  }
}

export class Maps {
    private _allMaps: Map[] = [];

    constructor(lines: string[]) {
        const initialMap = new Map(lines);
        initialMap.moveUntilOOB();
        const options = initialMap.getVisited();
        this._allMaps = options.map((o) => {
            const m = new Map(lines, o);
            m.moveUntilOOB();
            return m;
        });
    }

    public getTotalPossibleLoops() {
        return this._allMaps.filter(m => m.isLoop()).length;
    }
}
