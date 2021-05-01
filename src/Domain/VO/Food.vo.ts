export class Food {
  constructor(
    private _id: string,
    private _name: string,
    private _quantity: number,
    private _ch: number,
    private _fat: number,
    private _protein: number,
    private _fiber: number,
    private _kcal: number
  ) {}

  public id(): string {
    return this._id;
  }

  public name(): string {
    return this._name;
  }

  public quantity(): number {
    return this._quantity;
  }

  public ch(): number {
    return this._ch;
  }

  public fat(): number {
    return this._fat;
  }

  public protein(): number {
    return this._protein;
  }

  public fiber(): number {
    return this._fiber;
  }
  
  public kcal(): number {
    return this._kcal;
  }
}
