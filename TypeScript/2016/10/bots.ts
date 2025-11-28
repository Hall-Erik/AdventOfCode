export class Bot {
  public constructor(
    public readonly name: string,
    public readonly vals: number[] = [],
  ) {}

  public pushVal(v: number) {
    this.vals.push(v);
  }
}

export class Bin {
  public val?: number;

  public constructor(public readonly name: string) {}
}

export class Bots {
  private readonly bots: Map<string, Bot> = new Map();
  private readonly outputs: Bin[] = [];

  public constructor(private readonly instructions: string[]) {
    // set inputs
    const inputInstr = instructions.filter((i) => i.startsWith('value'));
    inputInstr.forEach((i) => {
      const instr = i.split(' ');
      const val = parseInt(instr[1]);
      const botName = instr[5];
      let bot: Bot;
      if (this.bots.has(botName)) {
        bot = this.bots.get(botName)!;
      } else {
        bot = new Bot(botName);
      }
      bot.pushVal(val);
    });
  }

  public getBotNameByVals(a: number, b: number): string | null {
    const botsFiltered = Array.from(this.bots.values()).filter(
      (bot) => bot.vals.includes(a) && bot.vals.includes(b),
    );
    return botsFiltered.length > 0 ? botsFiltered[0].name : null;
  }
}
