import { OPERATORS } from "../constants";
import { KeyReturnType } from "../types";

export class Filter<T> {
  constructor(
    private _column: keyof T,
    private _operation: OPERATORS,
    private _value: KeyReturnType<T> | KeyReturnType<T>[]
  ) {}


  public column(): string {
    return this._column as unknown as string;
  }

  public value(): KeyReturnType<T> | KeyReturnType<T>[] {
    return this._value;
  }

  public operation(): OPERATORS {
    return this._operation;
  }

}