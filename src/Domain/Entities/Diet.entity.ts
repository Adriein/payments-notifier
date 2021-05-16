import { Food } from '../VO/Food.vo';
import { v4 as uuidv4 } from 'uuid';
import { FoodNotFitsError } from '../Errors/Nutrition/FoodNotFitsError';
import { DietCustomitzation } from './DietCustomitzation.entity';

export class Diet {
  public static build(foods: Food[], kcal: number, userId: string): Diet {
    return new Diet(uuidv4(), foods, kcal, userId, new DietCustomitzation());
  }

  constructor(
    private _id: string,
    private _foods: Food[],
    private _kcal: number,
    private _userId: string,
    private _dietCustomitzation: DietCustomitzation
  ) {}

  public add(food: Food): void {
    this.doesFoodFit(food);
    this._foods.push(food);
  }

  public remove(foodToRemove: Food): void {
    this._foods = this._foods.filter((food) => food.id !== foodToRemove.id);
  }

  private doesFoodFit(food: Food): void {
    if (this._kcal + food.kcal() > this._kcal) {
      throw new FoodNotFitsError();
    }
  }

  public id(): string {
    return this._id;
  }

  public foods(): Food[] {
    return this._foods;
  }

  public kcal(): number {
    return this._kcal;
  }

  public userId(): string {
    return this._userId;
  }

  public isWeeklyOrganized = (): boolean => {
    return this._dietCustomitzation.isWeeklyOrganized;
  };

  public isMealOrganized = (): boolean => {
    return this._dietCustomitzation.isMealOrganized;
  };
}
