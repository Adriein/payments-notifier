import { OPERATORS } from '../../../Domain/constants';

export class Criteria {
  private _map = new Map<string, { equality: string, operation: string }>();
  private _field!: string;

  public field(field: string): this {
    this._field = field;
    return this;
  }

  public equals(equality: string): void {
    this._map.set(this._field, { equality, operation: OPERATORS.equal });
  }

  public get storage(): Map<string, { equality: string, operation: string }> {
    return this._map;
  }
}
