import { mod } from '../common/helpers';

export class Safe {
  private zeroCount = 0;

  public constructor(
    private position: number = 50,
    private readonly method0x434C49434B: boolean = false,
    private readonly size: number = 100,
  ) {}

  public rotate(instructions: string | string[]) {
    if (Array.isArray(instructions)) {
      for (const i of instructions) {
        this.rotate(i);
      }
      return;
    }
    const dir = instructions[0];
    let mag = parseInt(instructions.replace('L', '').replace('R', ''));
    if (this.method0x434C49434B && mag > 1) {
      this.rotate(Array(mag).fill(`${dir}1`));
      return;
    }
    if (dir === 'L') {
      mag = mag * -1;
    }
    this.position = mod(this.position + mag, this.size);
    if (this.position === 0) {
      this.zeroCount++;
    }
  }

  public get pos() {
    return this.position;
  }

  public get zeroes() {
    return this.zeroCount;
  }
}
