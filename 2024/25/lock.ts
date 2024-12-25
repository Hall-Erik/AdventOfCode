export class Lock {
  private _columns: number[] = [0, 0, 0, 0, 0];
  private readonly _isLock: boolean;

  constructor(lines: string[]) {
    this._isLock = lines[0][0] === '#' ? true : false;
    for (let y = 0; y < lines.length; y++) {
      for (let x = 0; x < lines[0].length; x++) {
        if (lines[y][x] === '#') this._columns[x] += 1;
      }
    }
  }

  public keyFits(key: Lock) {
    if (key.isLock) return false;
    for (let i = 0; i < this._columns.length; i++) {
      if (this._columns[i] + key.columns[i] > 7) return false;
    }
    return true;
  }

  public get columns() {
    return this._columns;
  }

  public get isLock() {
    return this._isLock;
  }
}

export class Locks {
  private _locks: Lock[] = [];
  private _keys: Lock[] = [];

  constructor(lines: string[]) {
    let newArray: string[] = [];
    const pushKeyLock = (arr: string[]) => {
      const kl = new Lock(arr);
      if (kl.isLock) {
        this._locks.push(kl);
      } else {
        this._keys.push(kl);
      }
    };
    for (const line of lines) {
      if (line.length === 0) {
        pushKeyLock(newArray);
        newArray = [];
      } else {
        newArray.push(line);
      }
    }
    pushKeyLock(newArray);
  }

  public getFitCount(): number {
    let sum = 0;
    this._locks.forEach((l) => {
      this._keys.forEach((k) => {
        if (l.keyFits(k)) sum++;
      });
    });
    return sum;
  }
}
