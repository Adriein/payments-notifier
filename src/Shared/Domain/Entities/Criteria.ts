import { OPERATORS } from '../../../Domain/constants';

export class Criteria {
  private _field!: string;
  private _equality!: string;
  private _operation!: OPERATORS;

  public field(field: string): this {
    this._field = field;
    return this;
  }

  public equals(equality: string): this {
    this._operation = OPERATORS.equal;
    this._equality = equality;
    return this;
  }

  public getField(): string {
    return this._field;
  }

  public getOperation(): string {
    return this._operation;
  }

  public getEquality(): string {
    return this._equality;
  }

  public toString(): string {
    return `${this._field} ${this._operation} ${this._equality}`;
  }
}
