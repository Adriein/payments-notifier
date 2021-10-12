export class QueryBuilder {
  private _select: string[] = [ '*' ];
  private _from: string = '';
  private _where: string[][] = [];
  private _leftJoin: string[] = [];

  public select(fields?: string[]): this {
    if (fields) {
      this._select = fields;
    }

    return this;
  }

  public from(table: string): this {
    this._from = table;
    return this;
  }

  public leftJoin(relations: Map<string, string>): this {
    return this;
  }

  public where(field: string, value: string): this {
    this._where.push([ field, value ]);
    return this;
  }

  public toQuery(): string {
    let query = '';

    if (this._select.length > 0) {
      query = `SELECT ${this._select.join(',')}`;
    }

    if () {

    }
  }
}