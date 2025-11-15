export class IpV7 {
  private readonly _isTls: boolean;
  private readonly _isSsl: boolean;

  public constructor(private readonly _address: string) {
    const abbaHypernetPattern = /(\w)(?!\1)(\w)\2\1(?:\w*\])/gm;
    const abbaPattern = /(\w)(?!\1)(\w)\2\1(?!\w*\])/gm;
    this._isTls =
      !abbaHypernetPattern.test(this._address) &&
      abbaPattern.test(this._address);
    const abaPattern = /((\w)(?!\2)(\w)\2)(?!\w*\])\S*(\[\w*(\3\2\3)\w*\])/gm;
    const abaAltPattern = /\[\w*(\w)(?!\1)(\w)\1\w*\]\S*(\2\1\2)(?!\w*\])/gm;
    this._isSsl =
      abaPattern.test(this._address) || abaAltPattern.test(this._address);
  }

  public get isTls(): boolean {
    return this._isTls;
  }

  public get isSsl(): boolean {
    return this._isSsl;
  }
}
