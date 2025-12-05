export class BatteryBank {
  public constructor(private readonly bank: string) {}

  public getMaxJoltage(): number {
    const joltages = new Set<number>();
    for (let i = 0; i < this.bank.length - 1; i++) {
      for (let j = i + 1; j < this.bank.length; j++) {
        const val = parseInt(`${this.bank[i]}${this.bank[j]}`);
        joltages.add(val);
      }
    }
    return Array.from(joltages).reduce((prev, curr) => {
      return curr >= prev ? curr : prev;
    }, 0);
  }

  public getMax12Joltage(): number {
    // const joltages = new Set<number>();
    let s = '';
    let pointer = 0;
    for (let i = 12; i > 0; i--) {
      const substr = this.bank.substring(0, this.bank.length - i + 1);
      for (let x = 9; x >= 0; x--) {
        const found = substr.indexOf(`${x}`, pointer);
        if (found >= 0) {
          s += `${x}`;
          pointer = found + 1;
          break;
        }
      }
    }
    return parseInt(s);
    // return Array.from(joltages).reduce((prev, curr) => {
    //   return curr >= prev ? curr : prev;
    // }, 0);
  }
}

export class BatterySupply {
  private readonly batteryBanks: BatteryBank[];

  public constructor(private readonly banks: string[]) {
    this.batteryBanks = banks.map((b) => new BatteryBank(b));
  }

  public getTotalJoltage(): number {
    return this.batteryBanks
      .map((b) => b.getMaxJoltage())
      .reduce((prev, curr) => prev + curr, 0);
  }

  public getTotal12Joltage(): number {
    return this.batteryBanks
      .map((b) => b.getMax12Joltage())
      .reduce((prev, curr) => prev + curr, 0);
  }
}
