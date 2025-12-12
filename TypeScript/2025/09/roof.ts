class Tile {
  public readonly x: number;
  public readonly y: number;

  public constructor(public readonly id: string) {
    [this.x, this.y] = id.split(',').map((c) => parseInt(c));
  }
}

class Rectangle {
  private x1: number;
  private x2: number;
  private y1: number;
  private y2: number;

  public constructor(
    public readonly a: Tile,
    public readonly b: Tile,
  ) {
    this.x1 = Math.min(a.x, b.x);
    this.x2 = Math.max(a.x, b.x);
    this.y1 = Math.min(a.y, b.y);
    this.y2 = Math.max(a.y, b.y);
  }

  public isIntersectedBy(line: Line): boolean {
    const aIsIn =
      line.a.x > this.x1 &&
      line.a.x < this.x2 &&
      line.a.y > this.y1 &&
      line.a.y < this.y2;
    const bIsIn =
      line.b.x > this.x1 &&
      line.b.x < this.x2 &&
      line.b.y > this.y1 &&
      line.b.y < this.y2;
    const horizInters =
      line.isHorizontal &&
      line.a.y > this.y1 &&
      line.a.y < this.y2 &&
      ((line.a.x >= this.x1 && line.a.x <= this.x2) ||
        (line.b.x >= this.x1 && line.b.x <= this.x2) ||
        (Math.min(line.a.x, line.b.x) <= this.x1 &&
          Math.max(line.a.x, line.b.x) >= this.x2));
    const vertInters =
      !line.isHorizontal &&
      line.a.x > this.x1 &&
      line.a.x < this.x2 &&
      ((line.a.y >= this.y1 && line.a.y <= this.y2) ||
        (line.b.y >= this.y1 && line.b.y <= this.y2) ||
        (Math.min(line.a.y, line.b.y) <= this.y1 &&
          Math.max(line.a.y, line.b.y) >= this.y2));
    return aIsIn || bIsIn || horizInters || vertInters;
  }

  public get id(): string {
    return [this.a, this.b]
      .sort((a, b) => a.x - b.x || a.y - b.y)
      .map((t) => t.id)
      .join('_');
  }

  public get size(): number {
    return Math.sqrt(
      Math.pow(this.a.x - this.b.x, 2) + Math.pow(this.a.y - this.b.y, 2),
    );
  }

  public get area(): number {
    const width = Math.abs(this.a.x - this.b.x) + 1;
    const height = Math.abs(this.a.y - this.b.y) + 1;
    return width * height;
  }
}

class Line {
  public readonly isHorizontal: boolean;
  public constructor(
    public readonly a: Tile,
    public readonly b: Tile,
  ) {
    this.isHorizontal = a.y === b.y;
  }
}

export class Roof {
  private tiles: Tile[];
  private rectangles: Rectangle[] = [];
  private lines: Line[] = [];

  public constructor(lines: string[]) {
    const lineQueue: Tile[] = [];
    this.tiles = lines.map((l) => {
      const t = new Tile(l);
      lineQueue.push(t);
      if (lineQueue.length === 2) {
        this.lines.push(new Line(lineQueue[0], lineQueue[1]));
        lineQueue.shift();
      }
      return t;
    });
    this.lines.push(new Line(lineQueue[0], this.tiles[0]));

    const queue = [...this.tiles];
    while (queue.length > 0) {
      const tile = queue.shift()!;
      for (const other of queue) {
        this.rectangles.push(new Rectangle(tile, other));
      }
    }

    this.rectangles.sort((a, b) => b.area - a.area);
  }

  public get largestArea(): number {
    const firstRect = this.rectangles[0];
    return firstRect.area;
  }

  public get largestArea2(): number {
    const rect = this.rectangles.filter(
      (r) => !this.lines.some((l) => r.isIntersectedBy(l)),
    )[0];
    return rect.area;
  }
}
