import { v4 as uuidv4 } from 'uuid';
import { FoodNotFitsError } from '../Errors/Nutrition/FoodNotFitsError';
import { ISerializable } from '../Interfaces/ISerializable';
import { Food } from '../VO/Food.vo';
import { DietCustomitzation } from './DietCustomitzation.entity';
import { Meal } from './Meal.entity';

export class Diet implements ISerializable {
  public static build(
    meals: Meal[],
    maxKcal: number,
    userId: string,
    adminId: string
  ): Diet {
    return new Diet(
      uuidv4(),
      meals,
      maxKcal,
      userId,
      adminId,
      new DietCustomitzation()
    );
  }

  private _kcalTracker: number = 0;

  constructor(
    private _id: string,
    private _meals: Meal[],
    private _maxKcal: number,
    private _userId: string,
    private _adminId: string,
    private _dietCustomitzation: DietCustomitzation
  ) {}

  public add(mealId: string, food: Food): void {
    const meal = this.findMeal(mealId);
    this.doesFoodFit(food);
    meal.add(food);
    this._kcalTracker = this._kcalTracker + food.kcal();
  }

  public remove(mealId: string, foodToRemove: Food): void {
    const meal = this.findMeal(mealId);
    meal.remove(foodToRemove);
    this._kcalTracker = this._kcalTracker - foodToRemove.kcal();
  }

  private doesFoodFit(food: Food): void {
    if (this._maxKcal + food.kcal() > this._maxKcal) {
      throw new FoodNotFitsError();
    }
  }

  private findMeal(mealId: string): Meal {
    return this._meals.find((meal) => meal.id === mealId)!;
  }

  public id(): string {
    return this._id;
  }

  public meals(): Meal[] {
    return this._meals;
  }

  public maxKcal(): number {
    return this._maxKcal;
  }

  public userId(): string {
    return this._userId;
  }

  public adminId(): string {
    return this._adminId;
  }

  public kcalTracker(): number {
    return this._kcalTracker;
  }

  public isWeeklyOrganized = (): boolean => {
    return this._dietCustomitzation.isWeeklyOrganized;
  };

  public isMealOrganized = (): boolean => {
    return this._dietCustomitzation.isMealOrganized;
  };

  public serialize(): Object {
    return {
      id: this.id(),
      meals: this.meals().map(meal => meal.serialize()),
      maxKcal: this.maxKcal(),
      userId: this.userId(),
      adminId: this.adminId(),
      kcalTracker: this.kcalTracker(),
      isWeeklyOrganized: this.isWeeklyOrganized(),
      isMealOrganized: this.isMealOrganized(),
    };
  }
}
