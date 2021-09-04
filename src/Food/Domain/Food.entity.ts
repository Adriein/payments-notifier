import { ID } from '../../Domain/VO/Id.vo';
import { AggregateRoot } from '../../Shared/Domain/Entities/AggregateRoot';
import { MicroNutrients } from './MicroNutrients.entity';

export class Food extends AggregateRoot {
  public static build(name: string, unit: string, micro: MicroNutrients): Food {
    return new Food(ID.generate(), name, unit, micro);
  }
  constructor(
    _id: ID,
    private _name: string,
    private _unit: string,
    private _micro: MicroNutrients,
    _dateCreated?: Date,
    _dateUpdated?: Date
  ) {
    super(_id, _dateCreated, _dateUpdated);
  }

  public name(): string {
    return this._name;
  }
  public unit(): string {
    return this._unit;
  }
  public micro(): MicroNutrients {
    return this._micro;
  }

  public serialize(): Object {
    throw new Error('Method not implemented.');
  }
}
