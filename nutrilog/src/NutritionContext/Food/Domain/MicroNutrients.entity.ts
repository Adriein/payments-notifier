export class MicroNutrients {
  constructor(
    private _name: string,
    private _amount: number
  ) {}

  public name(): string {
    return this._name;
  }

  public amount(): number {
    return this._amount;
  }
}
