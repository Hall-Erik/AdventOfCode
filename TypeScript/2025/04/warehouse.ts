export class Warehouse {
  private readonly height: number;
  private readonly width: number;
  private lines: string[][];

  public constructor(lines: string[]) {
    this.lines = lines.map((l) => l.split(''));
    this.height = lines.length;
    this.width = lines[0].length;
  }

  private isPager(x: number, y: number): boolean {
    if (x < 0 || x >= this.width) return false;
    if (y < 0 || y >= this.height) return false;
    return this.lines[y][x] === '@';
  }

  private countNeighbors(x: number, y: number): number {
    return [
      this.isPager(x - 1, y),
      this.isPager(x + 1, y),
      this.isPager(x, y - 1),
      this.isPager(x, y + 1),
      this.isPager(x - 1, y - 1),
      this.isPager(x + 1, y - 1),
      this.isPager(x + 1, y + 1),
      this.isPager(x - 1, y + 1),
    ].filter((r) => r).length;
  }

  private canMove(x: number, y: number): boolean {
    return this.countNeighbors(x, y) < 4;
  }

  private removeRolls(rolls: number[][]) {
    for (let [x, y] of rolls) {
      if (this.isPager(x, y)) {
        this.lines[y][x] = '.';
      }
    }
  }

  public getAccessibleRolls(remove: boolean = false): number {
    let rolls = 0;
    const rollPositions: number[][] = [];
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.isPager(x, y) && this.canMove(x, y)) {
          rolls++;
          rollPositions.push([x, y]);
        }
      }
    }
    if (remove) {
      this.removeRolls(rollPositions);
    }
    return rolls;
  }

  public findAndRemoveAccessibleRolls(): number {
    let rolls = 0;
    let changed = true;
    while (changed) {
      changed = false;
      const r = this.getAccessibleRolls(true);
      if (r > 0) {
        changed = true;
        rolls += r;
      }
    }
    return rolls;
  }

  public toString(): string {
    let map = '';
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.isPager(x, y)) {
          map += this.canMove(x, y) ? 'x' : '@';
        } else {
          map += '.';
        }
      }
      map += '\n';
    }
    return map;
  }
}
