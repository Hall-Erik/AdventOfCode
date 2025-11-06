export class Report {
  private _levels: number[] = [];
  private _dampener: boolean;
  private _dampened: number[][] = [];

  constructor(line: string, dampener: boolean = false) {
    this._dampener = dampener;
    line.split(' ').forEach((l) => this._levels.push(Number(l)));
    if (this._dampener) {
      this._dampened.push(this._levels.slice(1));
      for (let i = 0; i < this._levels.length - 1; i++) {
        const newList = [];
        if (i > 0) {
          newList.push(...this._levels.slice(0, i));
        }
        newList.push(
          ...this._levels.slice(i, i + 1),
          ...this._levels.slice(i + 2),
        );

        this._dampened.push(newList);
      }
    }
  }

  private checkSafe(report: number[] = this._levels) {
    const increasing = report[0] < report[1];
    if (!this.safeDiff(0, report)) return false;
    for (let i = 1; i < report.length - 1; i++) {
      if (increasing) {
        if (report[i] > report[i + 1] || !this.safeDiff(i, report))
          return false;
      } else {
        if (report[i] < report[i + 1] || !this.safeDiff(i, report))
          return false;
      }
    }
    return true;
  }

  private safeDiff(i: number, report: number[]) {
    const least = 1;
    const most = 3;
    const diff = Math.abs(report[i] - report[i + 1]);
    if (diff < least || diff > most) return false;
    return true;
  }

  public isSafe() {
    const reports = [this._levels, ...this._dampened];
    return reports.some((r) => this.checkSafe(r));
  }
}
