import { Filter } from "./Filter";


export class Criteria<T> {
  private readonly _filters: Filter<T>[] = [];


  public add(filter: Filter<T>): void {
    this._filters.push(filter);
  }

  public translate(): any {

  }

  public filters(): Filter<T>[] {
    return this._filters;
  }
}
