export class Filter {
  constructor(
    private _field: string,
    private _value: string,
    private _operator: string,
  ) {}

  public get field(): string {
    return this._field;
  }

  public get value(): string {
    return this._value;
  }

  public get operator(): string {
    return this._operator;
  }
}
