export class Keypad {
  private readonly _pad1: string[][] = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
  ];
  private readonly _pad2: string[][] = [
    ['', '', '1', '', ''],
    ['', '2', '3', '4', ''],
    ['5', '6', '7', '8', '9'],
    ['', 'A', 'B', 'C', ''],
    ['', '', 'D', '', ''],
  ];
  private readonly _pad: string[][];
  private _x: number;
  private _y: number;
  private _code: string = '';

  public constructor(pad: 1 | 2 = 1) {
    this._pad = pad === 1 ? this._pad1 : this._pad2;
    this._x = pad === 1 ? 1 : 0;
    this._y = pad === 1 ? 1 : 2;
  }

  public enterCode(instructions: string[]) {
    for (const instruction of instructions) {
      this.findAndPressButton(instruction);
    }
  }

  private findAndPressButton(instruction: string) {
    for (const i of instruction) {
      this.move(i);
    }
    this._code += this._pad[this._y][this._x];
  }

  private move(i: string) {
    let x = this._x;
    let y = this._y;
    switch (i) {
      case 'U':
        y--;
        break;
      case 'D':
        y++;
        break;
      case 'L':
        x--;
        break;
      case 'R':
        x++;
    }
    if (
      x >= 0 &&
      x < this._pad[0].length &&
      y >= 0 &&
      y < this._pad.length &&
      this._pad[y][x]
    ) {
      this._x = x;
      this._y = y;
    }
  }

  public get code(): string {
    return this._code;
  }
}
