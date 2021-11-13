import { OPERATORS } from "../../../Domain/constants";

export class Filter {
  constructor(private _field: string, private _value: string, private _operation: OPERATORS) {}

  public field(): string {
    return this._field;
  }

  public value(): string {
    return this._value;
  }

  public operation(): OPERATORS {
    return this._operation;
  }

}