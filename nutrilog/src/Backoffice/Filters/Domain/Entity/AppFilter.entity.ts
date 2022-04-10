import { AggregateRoot } from "../../../../Shared/Domain/Entities/AggregateRoot";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { AppFilterField } from "./AppFilterField";
import { Collection } from "../../../../Shared/Domain/Entities/Collection";

export class AppFilter extends AggregateRoot {
  public static build(entity: string): AppFilter {
    return new AppFilter(ID.generate(), entity, new Collection<AppFilterField>([]));
  }

  constructor(
    _id: ID,
    private _entity: string,
    private _fields: Collection<AppFilterField>,
    _createdAt?: Date,
    _updatedAt?: Date
  ) {
    super(_id, _createdAt, _updatedAt);
  }

  public addField(field: AppFilterField): void {
    this._fields.add(field);
  }

  public entity(): string {
    return this._entity;
  }

  public fieldNames(): string[] {
    return this._fields.data().map((field: AppFilterField) => field.name());
  }

  public fields(): AppFilterField[] {
    return this._fields.data();
  }

  public addFieldValues(name: string, values: string[]): void {
    const field = this._fields.getBy((field: AppFilterField) => field.name() === name);
    
    for (const value of values) {
      field.addValue(value);
    }
  }

  public fillBooleanFieldValues(): void {
    for (const field of this._fields.data()) {
      if (field.type() === 'boolean') {
        field.addValue('true');
        field.addValue('false');
      }
    }
  }
}