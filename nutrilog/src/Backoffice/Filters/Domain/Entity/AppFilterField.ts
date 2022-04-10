import { BaseEntity } from "../../../../Shared/Domain/Entities/BaseEntity";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";

export class AppFilterField extends BaseEntity {
  constructor(
    private _name: string,
    private _type: string,
    private _values: string[]
  ) {
    super(ID.generate());
  }

  public name(): string {
    return this._name;
  }

  public type(): string {
    return this._type;
  }

  public values(): string[] {
    return this._values;
  }

  public addValue(value: string): void {
    this._values.push(value);
  }
}