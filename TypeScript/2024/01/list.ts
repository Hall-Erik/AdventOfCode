export class Lists {
  private _listA: number[] = [];
  private _listB: number[] = [];

  constructor(lines: string[]) {
    for (const line of lines) {
      const [a, b] = line.split('   ');
      this._listA.push(Number(a));
      this._listB.push(Number(b));
    }

    this._listA.sort();
    this._listB.sort();
  }

  public getDistance(i: number) {
    return Math.abs(this._listA[i] - this._listB[i]);
  }

  public getTotalDistance() {
    let total = 0;
    for (let i = 0; i < this._listA.length; i++) {
      total += this.getDistance(i);
    }
    return total;
  }

  public getScore(n: number) {
    return this._listB.filter((x) => x === n).length;
  }

  public getSimilarityScore() {
    let total = 0;
    for (const n of this._listA) {
      total += n * this.getScore(n);
    }
    return total;
  }

  public toString() {
    return this._listA.join(', ') + '\n' + this._listB.join(', ');
  }
}
