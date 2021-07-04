import { ID } from '../../VO/Id.vo';
import { BaseEntity } from '../BaseEntity';
import { Food } from './Food.entity';

export class Meal extends BaseEntity {
  public static build(name: string, foods: Food[]): Meal {
    return new Meal(ID.generate(), name, foods);
  }
  constructor(_id: ID, private _name: string, private _foods: Food[]) {
    super(_id, new Date(), new Date());
  }

  public serialize(): Object {
    return {};
  }
}
