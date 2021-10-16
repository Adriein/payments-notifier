export class QueryBuilder {
  private _select: string[] = [ '*' ];
  private _from: string = '';
  private _where: string[][] = [];
  private _leftJoin: Map<string, string> = new Map();

  private _insert: string = '';
  private _values: string[] = [];

  constructor(private prefix: string) {
  }

  public select(fields?: string[]): this {
    if (fields) {
      this._select = fields.map((field: string) => `${this.prefix}_${field}`);
    }

    return this;
  }

  public from(table: string): this {
    this._from = table;
    return this;
  }

  public leftJoin(relations: Map<string, string>): this {
    this._leftJoin = relations;
    return this;
  }

  public where(field: string, value: string): this {
    this._where.push([ field, value ]);
    return this;
  }

  public insert(table: string): this {
    this._insert = table;
    return this;
  }

  public values(values: string[]): this {
    this._values = values;
    return this;
  }

  public toQuery(): string {
    const query = [];

    if (this._select.length > 1) {
      query.push(`SELECT ${this._select.join(',')}`);
    }

    if (this._from.length > 0) {
      query.push(`FROM ${this._from}`);
    }

    if (this._leftJoin.size > 0) {
      query.push(`LEFT JOIN ${query}`);
    }

    if (this._where.length > 0) {
      query.push(this.whereBuilder());
    }

    if (this._insert.length > 0) {
      query.push(`INSERT INTO ${this._insert}`);
    }

    if (this._values.length > 0) {
      query.push(`VALUES (${this._values.join(',')})`);
    }

    return query.join(' ');
  }

  private whereBuilder(): string {
    return this._where.reduce((where: string, clause: string[], index: number) => {
      const [ field, value ] = clause;
      if (index === 0) {
        return `WHERE ${this.prefix}_${field} = '${value}'`
      }

      return `${where} AND ${this.prefix}_${field} = '${value}'`;
    }, '');
  }
}