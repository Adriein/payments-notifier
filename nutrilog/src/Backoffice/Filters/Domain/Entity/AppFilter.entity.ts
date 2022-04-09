import { AggregateRoot } from "../../../../Shared/Domain/Entities/AggregateRoot";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";

export class AppFilter extends AggregateRoot {
  public static build(entity: string): AppFilter {
    return new AppFilter(ID.generate(), entity, [], []);
  }

  constructor(
    _id: ID,
    private _entity: string,
    private _fields: string[],
    private _values: string[],
    _createdAt?: Date,
    _updatedAt?: Date
  ) {
    super(_id, _createdAt, _updatedAt);
  }

  public addField(field: string): void {
    this._fields.push(field);
  }

  public addValue(value: string): void {
    this._values.push(value);
  }

  public entity(): string {
    return this._entity;
  }

  public fields(): string[] {
    return this._fields;
  }
}