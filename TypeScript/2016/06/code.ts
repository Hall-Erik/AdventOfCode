import { Counter } from '../common/counter';

export class Code {
  private _counters: Counter[] = [];
  private _decoded: string = '';
  private _modifiedDecoded: string = '';

  public constructor(private readonly _input: string[]) {
    for (let i = 0; i < _input[0].length; i++) {
      this._counters.push(new Counter());
    }
    this.decode();
  }

  private decode() {
    for (const entry of this._input) {
      for (let i = 0; i < entry.length; i++) {
        this._counters[i].add(entry[i]);
      }
    }
    this._counters.forEach((c) => {
      this._decoded += c.getMostCommon();
      this._modifiedDecoded += c.getLeastCommon();
    });
  }

  public get decoded(): string {
    return this._decoded;
  }

  public get modifiedDecoded(): string {
    return this._modifiedDecoded;
  }
}
