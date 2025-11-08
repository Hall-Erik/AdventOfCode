export class Triangle {
  public constructor(
    private readonly _side1: number,
    private readonly _side2: number,
    private readonly _side3: number,
  ) {}

  public isValid(): boolean {
    return (
      this._side1 + this._side2 > this._side3 &&
      this._side2 + this._side3 > this._side1 &&
      this._side1 + this._side3 > this._side2
    );
  }
}

export class Triangles {
  public constructor(private readonly _list: number[][]) {}

  public countValidTrianglesHorizontal(): number {
    return this._list
      .map((row) => new Triangle(row[0], row[1], row[2]))
      .filter((t) => t.isValid()).length;
  }

  public countValidTrianglesVertical(): number {
    const ts: Triangle[] = [];
    for (let x = 0; x < this._list[0].length; x++) {
      for (let y = 0; y < this._list.length; y += 3) {
        ts.push(
          new Triangle(
            this._list[y][x],
            this._list[y + 1][x],
            this._list[y + 2][x],
          ),
        );
      }
    }
    return ts.filter((t) => t.isValid()).length;
  }
}
