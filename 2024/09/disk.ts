export class Disk {
  private _d: number[] = [];
  private _freeSpaces: number = 0;
  private _lf: number = -1;

  constructor(line: string) {
    for (let i = 0; i < line.length; i++) {
      const n = Number(line[i]);
      let val;
      if (i % 2 === 0) {
        val = i / 2;
      } else {
        val = -1;
      }
      const chunk = [];
      for (let j = 0; j < n; j++) {
        chunk.push(val);
        this._d.push(val);
      }
    }
    const lastFileIndex = this._d.findLastIndex((n) => n > 0);
    if (lastFileIndex) {
      this._lf = lastFileIndex;
      for (let i = 0; i < lastFileIndex; i++) {
        if (this._d[i] === -1) {
          this._freeSpaces++;
        }
      }
    }
  }

  public fragment() {
    let p1 = 0;
    let p2 = this._d.length - 1;
    while (this._freeSpaces > 0) {
      if (p1 > p2) break;
      const val1 = this._d[p1];
      const val2 = this._d[p2];
      let seeking = false;
      if (val1 !== -1) {
        p1++;
        seeking = true;
      }
      if (val2 === -1) {
        p2--;
        seeking = true;
      }
      if (seeking) {
        continue;
      }
      this._d[p1] = val2;
      this._d[p2] = val1;
      p1++;
      p2--;
      this._freeSpaces--;
    }
  }

  private countElems(value: number, endIndex: number) {
    let count = 0;
    for (let i = endIndex; i >= 0 && this._d[i] === value; i--) {
      count++;
    }
    return count;
  }

  public compact() {
    let val2 = Math.max(...this._d);
    let p1 = this._d.indexOf(-1);

    while (val2 >= 0) {
      if (p1 === -1) break;

      const p2 = this._d.lastIndexOf(val2);
      const len2 = this.countElems(val2, p2);
      const groupStart = p2 - len2 + 1;

      p1 = this._d.findIndex((e, i) => {
        return this._d.slice(i, i + len2).every((elem) => elem === -1);
      });

      if (p1 === -1 || p1 >= p2) {
        val2--;
        continue;
      }

      const group2 = this._d.slice(groupStart, p2 + 1);
      const group1 = this._d.slice(p1, p1 + len2);

      this._d.splice(p1, len2, ...group2);
      this._d.splice(groupStart, len2, ...group1);

      val2--;
    }
  }

  public getChecksum() {
    let total = 0;
    for (let i = 0; i < this._d.length; i++) {
      const val = this._d[i];
      if (val === -1) continue;
      total += val * i;
    }
    return total;
  }

  public toString() {
    return (
      this._d
        .map((d) => {
          if (d === -1) return '.';
          return `${d}`;
        })
        .join('') + `\n${this._freeSpaces} ${this._lf} ${this._d.length}`
    );
  }
}
