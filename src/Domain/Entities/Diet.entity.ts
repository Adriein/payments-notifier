import { v4 as uuidv4 } from 'uuid';
import { FoodNotFitsError } from '../Errors/Nutrition/FoodNotFitsError';
import { ISerializable } from '../Interfaces/ISerializable';
import { Food } from '../VO/Food.vo';
import { DietCustomitzation } from './DietCustomitzation.entity';
import { Meal } from './Meal.entity';

export class Diet implements ISerializable {
  public static build(maxKcal: number, userId: string): Diet {
    const uuid = uuidv4();
    return new Diet(uuid, maxKcal, userId, DietCustomitzation.build(uuid));
  }

  private _kcalTracker: number = 0;
  private _meals: Meal[] = Array<Meal>();

  constructor(
    private _id: string,
    private _maxKcal: number,
    private _userId: string,
    private _dietCustomitzation: DietCustomitzation
  ) {}

  public addMeal(meal: Meal): void {
    this._meals.push(meal);
  }

  public removeMeal(mealId: string): void {
    this._meals = this._meals.filter((meal) => meal.id !== mealId);
  }

  public addFood(mealId: string, food: Food): void {
    const meal = this.findMeal(mealId);
    this.doesFoodFit(food);
    meal.add(food);
    this._kcalTracker = this._kcalTracker + food.kcal();
  }

  public removeFood(mealId: string, foodToRemove: Food): void {
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
      meals: this.meals().map((meal) => meal.serialize()),
      maxKcal: this.maxKcal(),
      userId: this.userId(),
      kcalTracker: this.kcalTracker(),
      isWeeklyOrganized: this.isWeeklyOrganized(),
      isMealOrganized: this.isMealOrganized(),
    };
  }
}
