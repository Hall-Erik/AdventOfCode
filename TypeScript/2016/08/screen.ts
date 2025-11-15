export class Screen {
  private readonly _screen: boolean[][] = [];

  public constructor(
    private readonly _width: number,
    private readonly _height: number,
  ) {
    for (let y = 0; y < this._height; y++) {
      const row: boolean[] = [];
      for (let x = 0; x < this._width; x++) {
        row.push(false);
      }
      this._screen.push(row);
    }
  }

  public processInstruction(instruction: string) {
    const i = instruction.split(' ');
    switch (i[0]) {
      case 'rect':
        this._createRect(
          i[1].split('x').map((n) => parseInt(n))[0],
          i[1].split('x').map((n) => parseInt(n))[1],
        );
        break;
      case 'rotate':
        this._handleRotation(
          i[1],
          parseInt(i[2].split('=')[1]),
          parseInt(i[4]),
        );
        break;
    }
  }

  private _createRect(x: number, y: number) {
    for (let j = 0; j < y && j < this._height; j++) {
      for (let i = 0; i < x && i < this._width; i++) {
        this._screen[j][i] = true;
      }
    }
  }

  private _handleRotation(
    direction: string,
    position: number,
    magnitude: number,
  ) {
    switch (direction) {
      case 'column':
        this._rotateColumn(position, magnitude);
        break;
      case 'row':
        this._rotateRow(position, magnitude);
    }
  }

  private _rotateColumn(position: number, magnitude: number) {
    let col = this._screen.map((r) => r[position]);
    for (let n = 0; n < magnitude; n++) {
      col = [col.pop()!, ...col];
    }
    for (let j = 0; j < this._height; j++) {
      this._screen[j][position] = col[j];
    }
  }

  private _rotateRow(position: number, magnitude: number) {
    let row = [...this._screen[position]];
    for (let n = 0; n < magnitude; n++) {
      row = [row.pop()!, ...row];
    }
    this._screen[position] = row;
  }

  public get voltage(): number {
    return this._screen
      .map((row) => {
        return row.filter((p) => p).length;
      })
      .reduce((prev, curr) => prev + curr, 0);
  }

  public toString(): string {
    return this._screen
      .map((r) => {
        return r.map((f) => (f ? '#' : '.')).join('');
      })
      .join('\n');
  }
}
