class Problem {
  private numbers: number[] = [];
  private operator: string = '';

  public put(val: string) {
    const num = parseInt(val);
    if (Number.isNaN(num)) {
      this.operator = val;
    } else {
      this.numbers.push(num);
    }
  }

  public get result() {
    switch (this.operator) {
      case '+':
        return this.numbers.reduce((prev, curr) => prev + curr, 0);
      case '*':
        return this.numbers.reduce((prev, curr) => prev * curr, 1);
      default:
        return -1;
    }
  }
}

export class CMath {
  private problems: Problem[];

  public constructor(lines: string[]) {
    this.problems = [];
    for (
      let i = 0;
      i < lines[0].trim().replace(/\s+/g, ' ').split(' ').length;
      i++
    ) {
      this.problems.push(new Problem());
    }

    for (const line of lines) {
      const cols = line.trim().replace(/\s+/g, ' ').split(' ');
      for (let i = 0; i < cols.length; i++) {
        const col = cols[i];
        this.problems[i].put(col);
      }
    }
  }

  public get grandTotal() {
    return this.problems
      .map((prob) => prob.result)
      .reduce((prev, curr) => prev + curr, 0);
  }
}

export class CMathPart2 {
  private problems: Problem[];

  public constructor(lines: string[]) {
    this.problems = [];
    const width = lines[0].length;
    let prob = new Problem();
    for (let column = width - 1; column >= 0; column--) {
      let num = '';
      let operator = '';

      for (let row = 0; row < lines.length; row++) {
        const char = lines[row][column];
        if (char === '+' || char === '*') {
          operator = char;
        }
        if (Number.isInteger(parseInt(char))) {
          num += char;
        }
      }

      if (num.length > 0) {
        prob.put(num);
      }

      if (operator.length > 0) {
        prob.put(operator);
        this.problems.push(prob);
        prob = new Problem();
      }
    }
  }

  public get grandTotal() {
    return this.problems
      .map((prob) => prob.result)
      .reduce((prev, curr) => prev + curr, 0);
  }
}
