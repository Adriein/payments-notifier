import { NutritionPlan } from '../../Shared/Domain/types';
import { ID } from '../../Domain/VO/Id.vo';
import { BaseEntity } from '../../Domain/Entities/BaseEntity';
import { Food } from './Food.entity';
import { KcalCalculator } from './KcalCalculator';
import { Meal } from './Meal.entity';

export class Diet extends BaseEntity {
  private _meals: Meal[] = [];

  public static build(
    name: string,
    userId: ID,
    objective: keyof NutritionPlan,
    kcal: number
  ): Diet {
    return new Diet(ID.generate(), name, userId, objective, kcal);
  }

  constructor(
    _id: ID,
    private _name: string,
    private _userId: ID,
    private _objective: keyof NutritionPlan,
    private _kcal: number
  ) {
    super(_id, new Date(), new Date());
  }

  public meals(): Meal[] {
    return this._meals;
  }

  public add(name: string, foods: Food[]) {
    this._meals.push(Meal.build(name, foods));
  }

  public kcal = (): number => this._kcal;

  public serialize(): Object {
    return {};
  }
}
