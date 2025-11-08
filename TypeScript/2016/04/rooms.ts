export class Room {
  public _id: number = 0;
  private readonly _isReal: boolean;
  private _realName: string;

  public constructor(private readonly _room: string) {
    const parts = this._room.split('-');
    const name = parts.slice(0, -1);
    const nameJoined = name.join('');
    const [sectorId, checksum] = parts.slice(-1)[0].replace(']', '').split('[');
    this._id = Number(sectorId);
    const chars = Array.from(new Set(nameJoined))
      .sort()
      .sort((a, b) => {
        const aCount = nameJoined.match(new RegExp(a, 'g'))?.length ?? 0;
        const bCount = nameJoined.match(new RegExp(b, 'g'))?.length ?? 0;
        if (aCount > bCount) return -1;
        if (aCount < bCount) return 1;
        return 0;
      });
    this._isReal = chars.slice(0, 5).join('') === checksum;
    this._realName = name
      .join('-')
      .split('')
      .map((c) => {
        if (c >= 'a' && c <= 'z') {
          return String.fromCharCode(
            ((c.charCodeAt(0) - 97 + this._id) % 26) + 97,
          );
        }
        return c;
      })
      .join('')
      .replaceAll('-', ' ');
  }

  public get id(): number {
    return this._id;
  }

  public get isReal(): boolean {
    return this._isReal;
  }

  public get realName(): string {
    return this._realName;
  }

  public toString(): string {
    return `${this.realName} | ${this._id}`;
  }
}

export class Rooms {
  private readonly _rooms: Room[];

  public constructor(rooms: string[]) {
    this._rooms = rooms.map((r) => new Room(r));
  }

  public sumRealSectors(): number {
    return this._rooms
      .filter((r) => r.isReal)
      .map((r) => r.id)
      .reduce((prev, curr) => {
        return prev + curr;
      }, 0);
  }

  public toString(): string {
    return this._rooms
      .filter((r) => r.isReal)
      .filter((r) => r.realName.includes('storage'))
      .filter((r) => r.realName.includes('object'))
      .join('\n');
  }
}
