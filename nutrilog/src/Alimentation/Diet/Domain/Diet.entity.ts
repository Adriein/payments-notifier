import { ID } from '../../../Shared/Domain/VO/Id.vo';
import { Meal } from './Meal.entity';
import { DietType } from './VO/DietType.vo';
import { AggregateRoot } from "../../../Shared/Domain/Entities/AggregateRoot";
import { MealCollection } from "./MealCollection";
import { KcalExceedTotalError } from "./KcalExceedTotalError";

export class Diet extends AggregateRoot {
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
    private _active: boolean = true,
    private _meals: MealCollection = new MealCollection([]),
    _dateCreated?: Date,
    _dateUpdated?: Date
  ) {
    super(_id, _dateCreated, _dateUpdated);
  }


  public active(): boolean {
    return this._active;
  }

  public meals(): MealCollection {
    return this._meals;
  }

  public name(): string {
    return this._name;
  }

  public nutritionId(): string {
    return this._nutritionId.value;
  }

  public objective(): string {
    return this._objective.value;
  }

  public add(name: string, kcal: number, foods: ID[] = []) {
    if (this._meals.totalKcal() < kcal) {
      this._meals.add(Meal.build(name, foods, new ID(this.id()), kcal));
      this.entityUpdated();
    }
    throw new KcalExceedTotalError(`Meal: ${name} exceed maximum kcal permitted of ${this._kcal}`);
  }

  public flush(): void {
    this._meals = new MealCollection([]);
    this.entityUpdated();
  }

  public kcal = (): number => this._kcal;

}
