import { NutritionPlan } from '../../types';
import { ID } from '../../VO/Id.vo';
import { BaseEntity } from '../BaseEntity';
import { Food } from './Food.entity';
import { Meal } from './Meal.entity';

export class Diet extends BaseEntity {
  private _meals: Meal[] = [];

  public static build(
    name: string,
    userId: ID,
    objective: keyof NutritionPlan
  ): Diet {
    return new Diet(ID.generate(), name, userId, objective);
  }

  constructor(
    _id: ID,
    private _name: string,
    private _userId: ID,
    private _objective: keyof NutritionPlan
  ) {
    super(_id, new Date(), new Date());
  }

  public meals(): Meal[] {
    return this._meals;
  }

  public add(name: string, foods: Food[]) {
    this._meals.push(Meal.build(name, foods));
  }

  public serialize(): Object {
    return {};
  }
}
