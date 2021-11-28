import { OPERATORS } from "../../../Domain/constants";
import { GetReturnType } from "../types";

export class Filter<T> {
  constructor(
    private _field: keyof T,
    private _operation: OPERATORS,
    private _value: GetReturnType<T>
  ) {}

  public field(): keyof T {
    return this._field;
  }

  public value(): GetReturnType<T> {
    return this._value;
  }

  public operation(): OPERATORS {
    return this._operation;
  }

}