interface NumberMap {
  [key: number]: number[];
}

export class Printer {
  private _orderingRules: NumberMap = {};
  private _updates: number[][] = [];

  constructor(lines: string[]) {
    for (const line of lines) {
      if (line.includes('|')) {
        const [a, b] = line.split('|');
        const nA = Number(a);
        const nB = Number(b);
        if (this._orderingRules[nA]) {
          this._orderingRules[nA] = [...this._orderingRules[nA], nB];
        } else {
          this._orderingRules[nA] = [nB];
        }
        continue;
      }
      if (line.length === 0) continue;
      this._updates.push(line.split(',').map((s) => Number(s)));
    }
  }

  private isValidUpdate(update: number[]): boolean {
    const visited: number[] = [];
    for (const u of update) {
      const rule = this._orderingRules[u];
      visited.push(u);
      if (!rule) continue;
      if (rule.some((r) => visited.includes(r))) {
        return false;
      }
    }
    return true;
  }

  private fixUpdate(update: number[]): number[] {
    const up = [...update];
    return up.sort((a, b) => {
      const rules = this._orderingRules[a];
      if (!!rules && rules.includes(b)) return -1;
      return 0;
    });
  }

  public getFixInvalidUpdates() {
    return this._updates
      .filter((u) => !this.isValidUpdate(u))
      .map((u) => this.fixUpdate(u));
  }

  public getValidUpdates() {
    return this._updates.filter((u) => this.isValidUpdate(u));
  }

  public getMPNTotal() {
    return this.getValidUpdates()
      .map((u) => u[(u.length - 1) / 2])
      .reduce((acc, curr) => acc + curr, 0);
  }

  public getInvalidMPNTotal() {
    return this.getFixInvalidUpdates()
      .map((u) => u[(u.length - 1) / 2])
      .reduce((acc, curr) => acc + curr, 0);
  }
}
