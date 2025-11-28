export class Format {
  public constructor(private readonly _file: string) {}

  private findInstruction(s: string) {
    const p = /\((\d+)x(\d+)\)/;
    return s.match(p);
  }

  private getLeadLength(s: string, i: number): number {
    return s.substring(0, i).length;
  }

  public decodeLength(f: string = this._file, r: boolean = false): number {
    let file = `${f}`;
    let len = 0;
    let found = this.findInstruction(file);
    while (found) {
      // count everything up to that point
      len += this.getLeadLength(file, found.index!);
      // remove the instruction
      file = file.substring(found.index! + found[0].length);
      // grab the instruction space
      const size = parseInt(found[1]);
      const i = file.substring(0, size);
      // remove the instruction space
      file = file.substring(size);
      // process and add it
      const mult = parseInt(found[2]);
      if (r) {
        len += mult * this.decodeLength(i, r);
      } else {
        len += mult * size;
      }
      found = this.findInstruction(file);
    }
    len += file.length;
    return len;
  }

  public fullDecodeLength(): number {
    return this.decodeLength(this._file, true);
  }
}
