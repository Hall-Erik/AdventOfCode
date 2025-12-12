class Device {
  public readonly next: Device[] = [];

  public constructor(public readonly id: string) {}
}

export class ServerRack {
  private readonly deviceMap = new Map<string, Device>();
  private readonly mem = new Map<string, number>();

  public constructor(lines: string[]) {
    for (const line of lines) {
      const d = line.split(' ')[0].replace(':', '');
      this.deviceMap.set(d, new Device(d));
    }

    this.deviceMap.set('out', new Device('out'));

    for (const line of lines) {
      const split = line.split(' ');
      const d = split[0].replace(':', '');
      const n = split.slice(1).map((next) => this.deviceMap.get(next)!);
      this.deviceMap.get(d)?.next.push(...n);
    }
  }

  private dfs(node: string, end: string): number {
    const device = this.deviceMap.get(node)!;
    const key = `${node}->${end}`;
    if (this.mem.has(key)) return this.mem.get(key)!;
    const val =
      node === end
        ? 1
        : device.next
            .map((n) => this.dfs(n.id, end))
            .reduce((prev, curr) => prev + curr, 0);
    this.mem.set(key, val);
    return val;
  }

  public get paths(): number {
    return this.dfs('you', 'out');
  }

  public get paths2(): number {
    return (
      this.dfs('svr', 'dac') * this.dfs('dac', 'fft') * this.dfs('fft', 'out') +
      this.dfs('svr', 'fft') * this.dfs('fft', 'dac') * this.dfs('dac', 'out')
    );
  }
}
