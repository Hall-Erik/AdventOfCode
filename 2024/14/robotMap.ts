import { mod } from '../common/helpers';

interface Robot {
  pos: {
    x: number;
    y: number;
  };
  vel: {
    x: number;
    y: number;
  };
}

export class RobotMap {
  private _robots: Robot[] = [];
  private readonly _height: number;
  private readonly _width: number;
  private readonly _xMiddle: number;
  private readonly _yMiddle: number;

  constructor(lines: string[], width: number = 101, height: number = 103) {
    this._height = height;
    this._width = width;
    this._xMiddle = (width - 1) / 2;
    this._yMiddle = (height - 1) / 2;
    for (const line of lines) {
      const [pos, vel] = line.split(' ');
      const [x, y] = pos
        .replace('p=', '')
        .split(',')
        .map((n) => Number(n));
      const [dX, dY] = vel
        .replace('v=', '')
        .split(',')
        .map((n) => Number(n));
      this._robots.push({
        pos: { x, y },
        vel: { x: dX, y: dY },
      });
    }
  }

  private moveBots() {
    for (const r of this._robots) {
      r.pos.x = mod(r.pos.x + r.vel.x, this._width);
      r.pos.y = mod(r.pos.y + r.vel.y, this._height);
    }
  }

  public wait(seconds: number = 100) {
    for (let t = 0; t < seconds; t++) {
      this.moveBots();
    }
  }

  public getSafetyFactor(): number {
    let q1 = 0;
    let q2 = 0;
    let q3 = 0;
    let q4 = 0;
    for (const r of this._robots) {
      const { x, y } = r.pos;
      if (x > this._xMiddle && y < this._yMiddle) {
        q1++;
      } else if (x < this._xMiddle && y < this._yMiddle) {
        q2++;
      } else if (x < this._xMiddle && y > this._yMiddle) {
        q3++;
      } else if (x > this._xMiddle && y > this._yMiddle) {
        q4++;
      }
    }
    return q1 * q2 * q3 * q4;
  }

  public toString(): string {
    let s = '';
    const rm = new Map<string, number>();
    for (const r of this._robots) {
      const pString = `${r.pos.x},${r.pos.y}`;
      if (rm.has(pString)) {
        const curr = rm.get(pString)!;
        rm.set(pString, curr + 1);
      } else {
        rm.set(pString, 1);
      }
    }
    for (let y = 0; y < this._height; y++) {
      for (let x = 0; x < this._width; x++) {
        const pString = `${x},${y}`;
        if (rm.has(pString)) {
          s += `${rm.get(pString)}`;
        } else {
          s += '.';
        }
      }
      s += '\n';
    }
    return s;
  }
}
