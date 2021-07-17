import { BaseEntity } from '../../Domain/Entities/BaseEntity';
import { ID } from '../../Domain/VO/Id.vo';
import { GenderType, NutritionPlan } from '../../Shared/Domain/types';
import { Diet } from './Diet.entity';
import { KcalCalculator } from './KcalCalculator';
import { Gender } from './VO/Gender.vo';

export class Nutrition extends BaseEntity {
  private calc: KcalCalculator = new KcalCalculator();

  public static build(
    userId: ID,
    weight: number,
    height: number,
    age: number,
    gender: Gender
  ): Nutrition {
    return new Nutrition(ID.generate(), userId, weight, height, age, gender);
  }

  constructor(
    _id: ID,
    private _userId: ID,
    private _weight: number,
    private _height: number,
    private _age: number,
    private _gender: Gender,
    private _diets: Diet[] = [],
    _dateCreated?: Date,
    _dateUpdated?: Date
  ) {
    super(_id, _dateCreated, _dateUpdated);
  }

  public createDiet(
    name: string,
    objective: keyof NutritionPlan,
    kcalChange: number = 0
  ) {
    const kcal = this.calcKcal(this.lastDietKcal(), kcalChange);

    this._diets.push(Diet.build(name, this._userId, objective, kcal));
  }

  public kcalDiffHistory(): number[] {
    return this._diets.reduce(
      (history: number[], diet: Diet, index: number) => {
        const diff =
          diet.kcal() -
          (this._diets[index - 1] ? this._diets[index - 1].kcal() : 0);
        return [...history, diff];
      },
      new Array<number>()
    );
  }

  private calcKcal(kcal?: number, change?: number): number {
    if (change && kcal) {
      return kcal + change;
    }
    const calcKcal = this.calc
      .gender(this._gender.value)
      .calculate(this._weight, this._height, this._age);

    if (change) {
      return calcKcal + change;
    }

    return kcal ? kcal : calcKcal;
  }

  private lastDietKcal(): number | undefined {
    return this._diets[this._diets.length - 1]?.kcal();
  }

  public userId(): string {
    return this._userId.value;
  }

  public weight(): number {
    return this._weight;
  }

  public height(): number {
    return this._height;
  }

  public age(): number {
    return this._age;
  }

  public gender(): string {
    return this._gender.value;
  }

  public diets(): Diet[] {
    return this._diets;
  }

  public serialize(): Object {
    return {};
  }
}
