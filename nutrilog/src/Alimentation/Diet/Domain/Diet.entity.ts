import { ID } from '../../../Shared/Domain/VO/Id.vo';
import { Meal } from './Meal.entity';
import { DietType } from './VO/DietType.vo';
import { AggregateRoot } from "../../../Shared/Domain/Entities/AggregateRoot";

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
    private _meals: Meal[] = [],
    _dateCreated?: Date,
    _dateUpdated?: Date
  ) {
    super(_id, _dateCreated, _dateUpdated);
  }

  public meals(): Meal[] {
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

  public add(name: string, foods: ID[] = []) {
    this._meals.push(Meal.build(name, foods, new ID(this.id())));
    this.updated();
  }

  public flush(): void {
    this._meals = [];
    this.updated();
  }

  public kcal = (): number => this._kcal;
}
