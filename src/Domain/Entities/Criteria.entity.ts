import { Filter } from './Filter.entity';

export class Criteria {
  constructor(
    private _filters: Filter[],
    private _order?: string,
    private _offset?: number,
    private _limit?: number
  ) {}

  public get filters(): Filter[] {
    return this._filters;
  }

  public order = (): string | null => {
    if (this._order) {
      return this._order;
    }

    return null;
  };

  public offset = (): number | null => {
    if (this._offset) {
      return this._offset;
    }

    return null;
  };

  public limit = (): number | null => {
    if (this._limit) {
      return this._limit;
    }

    return null;
  };
}
