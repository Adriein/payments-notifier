import { Filter } from "./Filter";
import { KeyReturnType } from "../types";
import { OPERATORS } from "../constants";


export class Criteria<T> {
  private readonly _filters: Filter<T>[] = [];
  private readonly _page?: number | undefined;
  private readonly _quantity?: number | undefined;

  constructor(page?: number, quantity?: number) {
    this._page = page;
    this._quantity = quantity;
  }

  public add(filter: Filter<T>): void {
    this._filters.push(filter);
  }

  public equals(field: keyof T, value: KeyReturnType<T>): void {
    this._filters.push(new Filter<T>(field, OPERATORS.equal, value));
  }

  public page(): number | undefined {
    return this._page;
  }

  public quantity(): number | undefined {
    return this._quantity;
  }

  public filters(): Filter<T>[] {
    return this._filters;
  }
}
