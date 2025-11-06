export class City {
  private _x = 0;
  private _y = 0;
  private _dir = 0; // 0: N, 1: E, 2: S, 3: W

  public followInstructions(instructions: string[]) {
    instructions.forEach(this.followInstruction);
  }

  public followInstruction(instruction: string) {
    const dir = instruction[0];
    const dist = parseInt(instruction.substring(1));
    if (dir && dist) {
        this.turn(dir);
        this.move(dist);
    }
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

  private move(n: number) {
    switch (n) {
      case 0:
        this._y -= n;
        break;
      case 1:
        this._x += n;
        break;
      case 2:
        this._y += n;
        break;
      case 3:
        this._x -= n;
    }
  }

  public toString(): string {
    return `X: ${this._x}, Y: ${this._y}, Dir: ${this._dir}`;
  }
}
