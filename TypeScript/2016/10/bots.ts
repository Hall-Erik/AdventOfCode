class Dest {
  public constructor(
    public readonly name: string,
    public readonly isBot: boolean,
  ) {}
}

class Bot {
  private hasMoved: boolean = false;
  public readonly vals: number[] = [];
  public readonly name: string;
  public readonly highDest: Dest;
  public readonly lowDest: Dest;

  public constructor(instruction: string) {
    const instr = instruction.split(' ');
    this.name = instr[1];
    this.lowDest = new Dest(instr[6], instr[5] === 'bot');
    this.highDest = new Dest(instr[11], instr[10] === 'bot');
  }

  public set val(v: number) {
    if (this.vals.length >= 2) throw new Error('Can only have 2 chips');
    this.vals.push(v);
    this.vals.sort((a, b) => a - b);
  }

  public get canMove(): boolean {
    return this.vals.length === 2 && !this.hasMoved;
  }

  public move(b: boolean = true) {
    this.hasMoved = b;
  }

  public get highVal(): number {
    if (this.vals.length < 2) throw new Error('Must have 2 vals');
    return this.vals[1];
  }

  public get lowVal(): number {
    if (this.vals.length < 2) throw new Error('Must have 2 vals');
    return this.vals[0];
  }
}

export class Bin {
  public val: number = NaN;

  public constructor(public readonly name: string) {}
}

export class Bots {
  private readonly bots: Map<string, Bot> = new Map();
  private readonly outputs: Map<string, Bin> = new Map();

  private getBotByName(botName: string): Bot | undefined {
    if (this.bots.has(botName)) {
      return this.bots.get(botName);
    }
    return undefined;
  }

  private getOutputByName(binName: string): Bin {
    let bin: Bin;
    if (this.outputs.has(binName)) {
      bin = this.outputs.get(binName)!;
    } else {
      bin = new Bin(binName);
      this.outputs.set(binName, bin);
    }
    return bin;
  }

  private getDest(dest: Dest) {
    return dest.isBot
      ? this.getBotByName(dest.name)
      : this.getOutputByName(dest.name);
  }

  private initBots() {
    this.bots.clear();
    const botInstr = this.instructions.filter((i) => !i.startsWith('value'));
    botInstr.forEach((i) => {
      const bot = new Bot(i);
      this.bots.set(bot.name, bot);
    });
  }

  private initInputs() {
    const inputInstr = this.instructions.filter((i) => i.startsWith('value'));
    inputInstr.forEach((i) => {
      const instr = i.split(' ');
      const val = parseInt(instr[1]);
      const botName = instr[5];
      const bot = this.getBotByName(botName);
      if (bot) {
        bot.val = val;
      }
    });
  }

  private processInstructions() {
    const queue = Array.from(this.bots.values());

    while (queue.length > 0) {
      const b = queue.shift()!;
      if (b.canMove) {
        const destHigh = this.getDest(b.highDest);
        const destLow = this.getDest(b.lowDest);
        if (!destHigh || !destLow) throw new Error('Dest not found');
        destHigh.val = b.highVal;
        destLow.val = b.lowVal;
        b.move();
      } else {
        queue.push(b);
      }
    }
  }

  public constructor(private readonly instructions: string[]) {
    this.initBots();
    this.initInputs();
    this.processInstructions();
  }

  public getBotNameByVals(a: number, b: number): string | null {
    const botsFiltered = Array.from(this.bots.values()).filter(
      (bot) => bot.vals.includes(a) && bot.vals.includes(b),
    );
    return botsFiltered.length > 0 ? botsFiltered[0].name : null;
  }

  public getOutputsMultiplied(): number {
    return (
      this.getOutputByName('0').val *
      this.getOutputByName('1').val *
      this.getOutputByName('2').val
    );
  }
}
