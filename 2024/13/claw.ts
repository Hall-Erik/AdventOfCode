interface Point {
  x: number;
  y: number;
}

interface Button extends Point {
  cost: number;
}

class Prize {
  private _buttonA: Button;
  private _buttonB: Button;
  private _prize: Point;

  constructor(lines: string[], adjustPrize: boolean) {
    let [x, y] = lines[0]
      .replace('Button A: ', '')
      .replace('X+', '')
      .replace(' Y+', '')
      .split(',')
      .map((n) => Number(n));
    this._buttonA = { x, y, cost: 3 };

    [x, y] = lines[1]
      .replace('Button B: ', '')
      .replace('X+', '')
      .replace(' Y+', '')
      .split(',')
      .map((n) => Number(n));
    this._buttonB = { x, y, cost: 1 };

    [x, y] = lines[2]
      .replace('Prize: ', '')
      .replace('X=', '')
      .replace(' Y=', '')
      .split(',')
      .map((n) => Number(n));
    this._prize = {
      x: adjustPrize ? x + 10000000000000 : x,
      y: adjustPrize ? y + 10000000000000 : y,
    };
  }

  public getMinTokens() {
    const a =
      (this._prize.x * this._buttonB.y - this._prize.y * this._buttonB.x) /
      (this._buttonA.x * this._buttonB.y - this._buttonA.y * this._buttonB.x);
    const b =
      (this._buttonA.x * this._prize.y - this._buttonA.y * this._prize.x) /
      (this._buttonA.x * this._buttonB.y - this._buttonA.y * this._buttonB.x);

    return Number.isInteger(a) && Number.isInteger(b)
      ? a * this._buttonA.cost + b * this._buttonB.cost
      : 0;
  }
}

export class Claw {
  private _prizes: Prize[] = [];

  constructor(lines: string[], adjustPrize: boolean = false) {
    const groups = lines.join('\n').split('\n\n');
    for (const group of groups) {
      this._prizes.push(new Prize(group.split('\n'), adjustPrize));
    }
  }

  public getMinTokens() {
    return this._prizes.reduce((acc, curr) => curr.getMinTokens() + acc, 0);
  }
}
