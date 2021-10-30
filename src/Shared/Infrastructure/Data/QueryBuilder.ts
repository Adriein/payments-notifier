import { MetadataRelation } from "../../Domain/types";

export class QueryBuilder {
  private _select: string[] = [];
  private _from: string = '';
  private _where: string[][] = [];
  private _leftJoin: MetadataRelation[] = [];

  private _insert: string = '';
  private _values: string[] = [];

  private _update: string = '';
  private _set: string[][] = [];

  constructor(private prefix: string) {
  }

  public select(fields?: string[]): this {
    if (fields) {
      this._select = fields.map((field: string) => `${this.prefix}_${field}`);
      return this;
    }
    this._select = [ '*' ];
    return this;
  }

  public from(table: string): this {
    this._from = table;
    return this;
  }

  public leftJoin(relations: MetadataRelation[]): this {
    this._leftJoin = relations;
    return this;
  }

  public where(field: string, value: string): this {
    this._where.push([ field, value ]);
    return this;
  }

  public andWhere(field: string, value: string): this {
    this._where.push([ field, value ]);
    return this;
  }

  public insert(table: string): this {
    this._insert = table;
    return this;
  }

  public update(table: string): this {
    this._update = table;
    return this;
  }

  public set(set: string[][]): this {
    this._set = set;
    return this;
  }

  public values(values: string[]): this {
    this._values = values;
    return this;
  }

  public toQuery(): string {
    const query = [];

    if (this._select.length > 0) {
      query.push(`SELECT ${this._select.join(',')}`);
    }

    if (this._from.length > 0) {
      query.push(`FROM ${this._from}`);
    }

    if (this._leftJoin.length > 0) {
      query.push(this.leftJoinBuilder());
    }

    if (this._insert.length > 0) {
      query.push(`INSERT INTO ${this._insert}`);
    }

    if (this._values.length > 0) {
      query.push(`VALUES (${this._values.join(',')})`);
    }

    if (this._update.length > 0) {
      query.push(`UPDATE ${this._update}`);
    }

    if (this._set.length > 0) {
      query.push(this.updateBuilder());
    }

    if (this._where.length > 0) {
      query.push(this.whereBuilder());
    }

    return query.join(' ');
  }

  private leftJoinBuilder(): string {
    return this._leftJoin.map((join: MetadataRelation) => {
      return `LEFT JOIN ${join.refTable} ON ${this._from}.${this.prefix}_id = ${join.refTable}.${join.refPropName}`;
    }).join(' ');
  }

  private updateBuilder(): string {
    return this._set.reduce((set: string, clause: string[]) => {
      const [ column, value ] = clause;
      return `SET ${this.prefix}_${column} = ${value}`
    }, '');
  }

  private whereBuilder(): string {
    return this._where.reduce((where: string, clause: string[], index: number) => {
      const [ field, value ] = clause;
      if (index === 0 && value === 'null') {
        return `WHERE ${this.prefix}_${field} IS NULL`
      }

      if (index === 0) {
        return `WHERE ${this.prefix}_${field} = '${value}'`
      }

      if (value === 'null') {
        return `${where} AND ${this.prefix}_${field} IS NULL`;
      }

      return `${where} AND ${this.prefix}_${field} = '${value}'`;
    }, '');
  }
}