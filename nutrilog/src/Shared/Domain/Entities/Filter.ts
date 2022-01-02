import { OPERATORS } from "../constants";
import { KeyReturnType } from "../types";

export class Filter<T> {
  constructor(
    private _field: keyof T,
    private _operation: OPERATORS,
    private _value: KeyReturnType<T>
  ) {}


  public field(): string {
    return this._field as unknown as string;
  }

  public value(): KeyReturnType<T> {
    return this._value;
  }

  public operation(): OPERATORS {
    return this._operation;
  }

}