import { coordsToKey } from '../common/helpers';

export class City {
  private _x = 0;
  private _y = 0;
  private _dir = 0; // 0: N, 1: E, 2: S, 3: W
  private _visited = new Set<string>();
  private _done = false;

  public followInstructions(
    instructions: string[],
    stopAtDup: boolean = false,
  ) {
    this._visited.add(coordsToKey(this._x, this._y));
    for (const i of instructions) {
      this.followInstruction(i, stopAtDup);
      if (this._done) break;
    }
  }

  public followInstruction(instruction: string, stopAtDup: boolean = false) {
    const dir = instruction[0];
    const dist = parseInt(instruction.substring(1));
    if (dir && dist) {
      this.turn(dir);
      for (let i = 0; i < dist; i++) {
        this.move();
        if (stopAtDup) {
          const key = coordsToKey(this._x, this._y);
          if (this._visited.has(key)) {
            this._done = true;
            break;
          }
          this._visited.add(key);
        }
      }
    }
  }

  public get dist(): number {
    return Math.abs(this._x) + Math.abs(this._y);
  }

  private turn(c: string) {
    switch (c) {
      case 'R':
        this._dir = (this._dir + 1) % 4;
        break;
      case 'L':
        this._dir = (this._dir - 1 + 4) % 4;
    }
  }

  private move() {
    switch (this._dir) {
      case 0:
        this._y--;
        break;
      case 1:
        this._x++;
        break;
      case 2:
        this._y++;
        break;
      case 3:
        this._x--;
    }
  }

  public toString(): string {
    return `X: ${this._x}, Y: ${this._y}, Dir: ${this._dir}`;
  }
}
