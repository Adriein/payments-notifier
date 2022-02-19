import { Collection } from "../../../Shared/Domain/Entities/Collection";
import { Meal } from "./Meal.entity";

export class MealCollection extends Collection<Meal> {
  constructor(meals: Meal[]) {
    super(meals);
  }

  public totalKcal(): number {
    return this.data().reduce((kcal: number, meal: Meal) => {
      return kcal + meal.kcal();
    }, 0);
  }
}