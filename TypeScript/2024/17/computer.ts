import { mod } from '../common/helpers';

export class Computer {
  private registerA: number;
  private registerB: number;
  private registerC: number;
  private program: number[] = [];
  private out: number[] = [];
  private instructionPointer: number = 0;

  constructor(lines: string[]) {
    this.registerA = parseInt(lines[0].replace('Register A: ', ''));
    this.registerB = parseInt(lines[1].replace('Register B: ', ''));
    this.registerC = parseInt(lines[2].replace('Register C: ', ''));
    this.program.push(
      ...lines[4]
        .replace('Program: ', '')
        .split(',')
        .map((n) => parseInt(n)),
    );
  }

  private initialize(registerAVal: number) {
    this.registerA = registerAVal;
    this.registerB = 0;
    this.registerC = 0;
  }

  private getComboOperand(operand: number): number {
    if (operand >= 0 && operand <= 3) return operand;
    if (operand === 4) return this.registerA;
    if (operand === 5) return this.registerB;
    if (operand === 6) return this.registerC;
    throw new Error('Not implemented');
  }

  private dv(operand: number): number {
    return Math.trunc(
      this.registerA / Math.pow(2, this.getComboOperand(operand)),
    );
  }

  private mod8(operand: number): number {
    return mod(this.getComboOperand(operand), 8);
  }

  private performOp(opCode: number, operand: number) {
    switch (opCode) {
      case 0: // adv
        this.registerA = this.dv(operand);
        break;
      case 1: // bxl
        this.registerB = this.registerB ^ operand;
        break;
      case 2: // bst
        this.registerB = this.mod8(operand);
        break;
      case 3: // jnz
        if (this.registerA === 0) break;
        this.instructionPointer = operand;
        return;
      case 4: // bxc
        this.registerB = this.registerB ^ this.registerC;
        break;
      case 5: // out
        this.out.push(this.mod8(operand));
        break;
      case 6: // bdv
        this.registerB = this.dv(operand);
        break;
      case 7: // cdv
        this.registerC = this.dv(operand);
        break;
    }
    this.instructionPointer += 2;
  }

  private isQuite(): boolean {
    return (
      this.out.length === this.program.length &&
      this.program.every((val, ind) => val === this.out[ind])
    );
  }

  public run() {
    this.out = [];
    this.instructionPointer = 0;
    while (this.instructionPointer < this.program.length) {
      const opCode = this.program[this.instructionPointer];
      const operand = this.program[this.instructionPointer + 1];
      this.performOp(opCode, operand);
    }
    return this.out.join(',');
  }

  public findQuine(startAt: number = 0) {
    const inc = (pow: number) => (pow >= 0 ? Math.pow(8, pow) : 1);
    let curr = startAt;
    let incPow = this.program.length - 2;
    for (let ptr = this.program.length; ptr >= 0; ptr--) {
      while (this.out[ptr] !== this.program[ptr]) {
        this.initialize(curr);
        this.run();
        if (this.isQuite()) {
          return curr;
        }
        curr += inc(incPow);
      }
      incPow--;
    }
    if (!this.isQuite()) curr = this.findQuine(curr);
    return curr;
  }
}
