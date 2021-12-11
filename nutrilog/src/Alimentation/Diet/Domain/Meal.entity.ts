import { BaseEntity } from '../../../Shared/Domain/Entities/BaseEntity';
import { ID } from '../../../Shared/Domain/VO/Id.vo';

export class Meal extends BaseEntity {
  public static build(name: string, foods: ID[], dietId: ID, kcal: number): Meal {
    return new Meal(ID.generate(), name, foods, dietId, kcal);
  }

  constructor(
    _id: ID,
    private _name: string,
    private _foods: ID[],
    private _dietId: ID,
    private _kcal: number,
    _dateCreated?: Date,
    _dateUpdated?: Date
  ) {
    super(_id, _dateCreated, _dateUpdated);
  }

  public add(food: ID): void {
    this._foods.push(food);
  }


  public kcal(): number {
    return this._kcal;
  }

  public name(): string {
    return this._name;
  }

  public foods(): ID[] {
    return this._foods;
  }

  public dietId(): string {
    return this._dietId.value;
  }
}
