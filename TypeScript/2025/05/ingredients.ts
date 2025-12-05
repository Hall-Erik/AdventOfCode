class IngredientRange {
  public readonly min: number;
  public readonly max: number;

  public constructor(public readonly id: string) {
    [this.min, this.max] = id.split('-').map((s) => parseInt(s));
  }

  public includes(n: number) {
    return n >= this.min && n <= this.max;
  }

  public includesOrAdjacent(n: number) {
    return n >= this.min - 1 && n <= this.max + 1;
  }

  public get size(): number {
    return this.max - this.min + 1;
  }

  public toString(): string {
    return this.id;
  }
}

export class Ingredients {
  private readonly ingredientRanges: IngredientRange[];
  private readonly ingredinetIds: number[];

  public constructor(keys: string[]) {
    this.ingredientRanges = this.dedupe(
      keys
        .filter((line) => line.includes('-'))
        .map((line) => new IngredientRange(line)),
    );
    this.ingredinetIds = keys
      .filter((line) => line && !line.includes('-'))
      .map((line) => parseInt(line));
  }

  public get freshCount() {
    return this.ingredinetIds.filter((i) =>
      this.ingredientRanges.some((ir) => ir.includes(i)),
    ).length;
  }

  private dedupe(irs: IngredientRange[]): IngredientRange[] {
    let queue = [...irs];
    queue.sort((a, b) => a.min - b.min);
    const ranges: IngredientRange[] = [];
    while (queue.length > 0) {
      const range = queue.shift()!;
      const otherRange = queue.find(
        (ir) => range.includes(ir.min) || range.includes(ir.max),
      );
      if (otherRange) {
        queue = queue.filter((ir) => ir.id !== otherRange.id);
        const newMin = Math.min(range.min, otherRange.min);
        const newMax = Math.max(range.max, otherRange.max);
        queue.push(new IngredientRange(`${newMin}-${newMax}`));
        continue;
      }
      ranges.push(range);
    }
    return ranges;
  }

  public get freshIngredientIdCount() {
    return this.ingredientRanges
      .map((i) => i.size)
      .reduce((prev, curr) => prev + curr, 0);
  }
}
