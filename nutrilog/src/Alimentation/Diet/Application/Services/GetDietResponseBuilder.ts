import { DietResponse, MealsResponse } from "../Find/DietResponse";
import { Diet } from "../../Domain/Diet.entity";
import { Meal } from "../../Domain/Meal.entity";

export class GetDietResponseBuilder {
  public run(diet: Diet): DietResponse {
    return {
      id: diet.id(),
      name: diet.name(),
      active: diet.active(),
      kcal: diet.kcal(),
      objective: diet.objective(),
      nutritionId: diet.nutritionId(),
      meals: this.buildMealResponse(diet),
      createdAt: diet.createdAt(),
      updatedAt: diet.updatedAt()
    }
  }

  private buildMealResponse(diet: Diet): MealsResponse[] {
    return diet.meals().map((meal: Meal) => {
      return {
        id: meal.id(),
        dietId: meal.dietId(),
        name: meal.name(),
        foods: [],
        createdAt: meal.createdAt(),
        updatedAt: meal.updatedAt()
      }
    });
  }
}