import { Food } from '../VO/Food.vo';
import { v4 as uuidv4 } from 'uuid';
import { FoodNotFitsError } from '../Errors/Nutrition/FoodNotFitsError';

export class Diet {
  public static build(foods: Food[], kcal: number, userId: string): Diet {
    return new Diet(uuidv4(), foods, kcal, userId);
  }

  constructor(
    private _id: string,
    private _foods: Food[],
    private _kcal: number,
    private _userId: string
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
}
