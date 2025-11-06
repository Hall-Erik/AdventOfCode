export class Computer {
  private enabled = true;

  public static process(line: string) {
    let sum = 0;
    const regexp = /mul\((\d+),(\d+)\)/g;
    const matches = line.matchAll(regexp);
    for (const match of matches) {
      if (match) {
        sum += Number(match[1]) * Number(match[2]);
      }
    }
    return sum;
  }

  public processConditionally(line: string) {
    let sum = 0;
    const regexp = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g;
    const matches = line.matchAll(regexp);
    for (const match of matches) {
      if (match) {
        const m = match[0];
        if (m === 'do()') {
          this.enabled = true;
        } else if (m === "don't()") {
          this.enabled = false;
        } else if (this.enabled) {
          sum += Number(match[1]) * Number(match[2]);
        }
      }
    }
    return sum;
  }
}
