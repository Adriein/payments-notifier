import { BaseEntity } from '../../Domain/Entities/BaseEntity';
import { ID } from '../../Domain/VO/Id.vo';
import { Food } from './Food.entity';

export class Meal extends BaseEntity {
  public static build(name: string, foods: Food[]): Meal {
    return new Meal(ID.generate(), name, foods);
  }
  constructor(_id: ID, private _name: string, private _foods: Food[]) {
    super(_id, new Date(), new Date());
  }

  public add(food: Food): void {
    this._foods.push(food);
  }

  public serialize(): Object {
    return {};
  }
}
