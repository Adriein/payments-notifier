import { ID } from '../../Domain/VO/Id.vo';
import { BaseEntity } from '../../Domain/Entities/BaseEntity';
import { Food } from './Food.entity';
import { Meal } from './Meal.entity';
import { DietType } from './VO/DietType.vo';

export class Diet extends BaseEntity {
  private _meals: Meal[] = [];

  public static build(
    name: string,
    nutritionId: ID,
    objective: DietType,
    kcal: number
  ): Diet {
    return new Diet(ID.generate(), name, nutritionId, objective, kcal);
  }

  constructor(
    _id: ID,
    private _name: string,
    private _nutritionId: ID,
    private _objective: DietType,
    private _kcal: number,
    _dateCreated?: Date,
    _dateUpdated?: Date
  ) {
    super(_id, _dateCreated, _dateUpdated);
  }

  public meals(): Meal[] {
    return this._meals;
  }

  public add(name: string, foods: Food[] = []) {
    this._meals.push(Meal.build(name, foods));
  }

  public flush(): void {
    this._meals = [];
  }

  public kcal = (): number => this._kcal;

  public serialize(): Object {
    return {a : 'aa'};
  }
}
