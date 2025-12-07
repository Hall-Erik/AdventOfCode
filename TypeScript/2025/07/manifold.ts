import { setCharAt } from '../common/helpers';

export class Manifold {
  private readonly height: number;
  private readonly width: number;
  private splits: number = 0;

  public constructor(private lines: string[]) {
    this.height = lines.length;
    this.width = lines[0].length;
    let queue = [lines[0].indexOf('S')];
    for (let i = 1; i < this.height; i++) {
      let line = lines[i];
      let nextQueue = new Set<number>();
      while (queue.length > 0) {
        const beam = queue.shift()!;
        if (line.charAt(beam) === '^') {
          this.splits++;
          for (let b of [beam - 1, beam + 1]) {
            if (b >= 0 && b < this.width) {
              nextQueue.add(b);
            }
          }
        } else {
          line = setCharAt(line, '|', beam);
          nextQueue.add(beam);
        }
      }
      lines[i] = line;
      queue = [...nextQueue];
    }
  }

  public get splitCount(): number {
    return this.splits;
  }

  public toString(): string {
    let s = '';
    for (let line of this.lines) {
      s += line + '\n';
    }
    return s;
  }
}

export class QuantumManifold {
  private readonly height: number;
  private readonly width: number;
  private timelinesTotal: number = 0;

  public constructor(lines: string[]) {
    this.height = lines.length;
    this.width = lines[0].length;
    let timelines = new Map<number, number>();
    timelines.set(lines[0].indexOf('S'), 1);
    for (let i = 1; i < this.height; i++) {
      const line = lines[i];
      let rowTimeline = new Map<number, number>();
      for (let [beam, count] of timelines.entries()) {
        if (line.charAt(beam) === '^') {
          for (let b of [beam - 1, beam + 1]) {
            if (b >= 0 && b < this.width) {
              rowTimeline.set(b, (rowTimeline.get(b) || 0) + count);
            }
          }
        } else {
          rowTimeline.set(beam, (rowTimeline.get(beam) || 0) + count);
        }
      }
      timelines = rowTimeline;
    }
    this.timelinesTotal = [...timelines.values()].reduce(
      (prev, curr) => prev + curr,
      0,
    );
  }

  public get timelineCount(): number {
    return this.timelinesTotal;
  }
}
