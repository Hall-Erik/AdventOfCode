export class Counter {
  private readonly _map = new Map<string, number>();

  public add(k: string, n: number = 1) {
    const curr = this._map.get(k) ?? 0;
    this._map.set(k, curr + n);
  }

  public getMostCommon(): string {
    let key = '';
    let val = 0;
    for (const [k, v] of this._map.entries()) {
      if (v > val) {
        val = v;
        key = k;
      }
    }
    return key;
  }

  public getLeastCommon(): string {
    let key = '';
    let val = Number.POSITIVE_INFINITY;
    for (const [k, v] of this._map.entries()) {
      if (v < val) {
        val = v;
        key = k;
      }
    }
    return key;
  }
}
