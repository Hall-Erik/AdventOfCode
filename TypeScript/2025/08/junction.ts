class JunctionBox {
  public readonly x: number;
  public readonly y: number;
  public readonly z: number;

  public constructor(
    public readonly id: string,
    public circuit: number,
  ) {
    [this.x, this.y, this.z] = id.split(',').map((c) => parseInt(c));
  }

  public getDist(other: JunctionBox) {
    return Math.sqrt(
      Math.pow(other.x - this.x, 2) +
        Math.pow(other.y - this.y, 2) +
        Math.pow(other.z - this.z, 2),
    );
  }
}

class Connection {
  public readonly id: string;

  public constructor(
    public readonly dist: number,
    public readonly a: JunctionBox,
    public readonly b: JunctionBox,
  ) {
    this.id = [a, b]
      .sort((a, b) => a.x - b.x || a.y - b.y || a.z - b.z)
      .map((b) => b.id)
      .join(',');
  }

  public includes(box: JunctionBox) {
    return [this.a, this.b].some((b) => b.id === box.id);
  }
}

export class Circuits {
  private boxes: JunctionBox[] = [];
  private connections: Connection[] = [];

  public constructor(lines: string[]) {
    for (let i = 0; i < lines.length; i++) {
      this.boxes.push(new JunctionBox(lines[i], i));
    }

    const seenConns = new Set<string>();
    for (const box of this.boxes) {
      for (const b of this.boxes.filter((b) => b.id !== box.id)) {
        const d = box.getDist(b);
        const connection = new Connection(d, box, b);
        if (!seenConns.has(connection.id)) {
          this.connections.push(connection);
          seenConns.add(connection.id);
        }
      }
    }

    this.connections.sort((a, b) => a.dist - b.dist);
  }

  public mult(size: number = 10): number {
    const connectionsFiltered = this.connections.slice(0, size);

    const boxesFiltered = this.boxes.filter((b) =>
      connectionsFiltered.some((c) => c.includes(b)),
    );

    for (const connection of connectionsFiltered) {
      const circuitL = connection.a.circuit;
      const circuitR = connection.b.circuit;
      if (circuitL !== circuitR) {
        boxesFiltered
          .filter((b) => b.circuit === circuitR)
          .forEach((b) => {
            b.circuit = circuitL;
          });
      }
    }

    const circuits = new Map<number, number>();
    for (let b of boxesFiltered) {
      const circuit = b.circuit;
      const curr = circuits.get(circuit) ?? 0;
      circuits.set(circuit, curr + 1);
    }

    return [...circuits.values()]
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((prev, curr) => prev * curr, 1);
  }

  public mult2(): number {
    let lastConn = this.connections[0];

    let changed = true;
    while (changed) {
      changed = false;
      for (const connection of this.connections) {
        const circuitL = connection.a.circuit;
        const circuitR = connection.b.circuit;
        if (circuitL !== circuitR) {
          this.boxes
            .filter((b) => b.circuit === circuitR)
            .forEach((b) => {
              b.circuit = circuitL;
            });
          changed = true;
          lastConn = connection;
        }
      }
    }

    return lastConn.a.x * lastConn.b.x;
  }
}
