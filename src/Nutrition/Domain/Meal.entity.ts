import { BaseEntity } from '../../Domain/Entities/BaseEntity';
import { ID } from '../../Domain/VO/Id.vo';
import { Food } from './Food.entity';

export class Meal extends BaseEntity {
  public static build(name: string, foods: Food[], dietId: ID): Meal {
    return new Meal(ID.generate(), name, foods, dietId);
  }
  constructor(
    _id: ID,
    private _name: string,
    private _foods: Food[],
    private _dietId: ID,
    _dateCreated?: Date,
    _dateUpdated?: Date
  ) {
    super(_id, _dateCreated, _dateUpdated);
  }

  public add(food: Food): void {
    this._foods.push(food);
  }

  public name(): string {
    return this._name;
  }

  public foods(): Food[] {
    return this._foods;
  }

  public dietId(): string {
    return this._dietId.value;
  }

  public serialize(): Object {
    return {};
  }
}
