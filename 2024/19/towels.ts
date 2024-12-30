import ProgressBar from 'progress';

export class Towels {
  private _options: string[] = [];
  private _combos: string[] = [];
  private _possibilities: Map<string, number> = new Map();

  constructor(lines: string[]) {
    this._options = lines[0].split(', ');
    for (let i = 2; i < lines.length; i++) {
      this._combos.push(lines[i]);
    }
  }

  private isComboPossible(combo: string): boolean {
    const q = [...this._options];
    const seen = new Set(...this._options);
    while (q.length > 0) {
      const curr = q.shift();
      for (const opt of this._options) {
        const next = curr + opt;
        if (next === combo) return true;
        if (next.length <= combo.length && !seen.has(next)) {
          if (next !== combo.substring(0, next.length)) continue;
          q.push(next);
          seen.add(next);
        }
      }
    }
    return false;
  }

  private dfs(curr: string, combo: string): number {
    if (curr.length > combo.length || curr != combo.substring(0, curr.length))
      return 0;
    if (curr === combo) return 1;
    if (this._possibilities.has(curr)) {
      return this._possibilities.get(curr)!;
    }
    let sum = 0;
    for (const opt of this._options) {
      const next = curr + opt;

      const val = this.dfs(next, combo);
      this._possibilities.set(next, val);
      sum += val;
    }
    this._possibilities.set(curr, sum);
    return sum;
  }

  private countOptions(combo: string): number {
    return this._options.reduce((acc, curr) => acc + this.dfs(curr, combo), 0);
  }

  public countPossible(showBar: boolean = false): number {
    const bar = showBar
      ? new ProgressBar(':bar :percent :eta', this._combos.length)
      : undefined;
    return this._combos.filter((c) => {
      if (bar) bar.tick();
      return this.isComboPossible(c);
    }).length;
  }

  public countPossibleCombos(showBar: boolean = false): number {
    const bar = showBar
      ? new ProgressBar(':bar :percent :eta', this._combos.length)
      : undefined;
    return this._combos.reduce((acc, curr) => {
      this._possibilities.clear();
      if (bar) bar.tick();
      return this.countOptions(curr) + acc;
    }, 0);
  }
}
