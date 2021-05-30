import { Diet } from '../../../Domain/Entities/Diet.entity';
import { DietCustomitzation } from '../../../Domain/Entities/DietCustomitzation.entity';
import { Meal } from '../../../Domain/Entities/Meal.entity';
import { IMapper } from '../../../Domain/Interfaces';
import { Food } from '../../../Domain/VO/Food.vo';

type DietTable = {
  id: string;
  max_kcal: number;
  user_id: string;
};

type DietMealFoodJoin = {
  diet_id: string;
  maxkcal: number;
  user_id: string;
  diet_meal_id: string;
  diet_meal_name: string;
  food_id: string;
  food_name: string;
  quantity: number;
  ch: number;
  fat: number;
  protein: number;
  fiber: number;
  kcal: number;
};

type MealHash = { [key: string]: { id: string; foods: Food[] } };

export class DietMapper implements IMapper<Diet> {
  public domain(datamodel: DietMealFoodJoin[]): Diet {
    const diet = new Diet(
      datamodel[0].diet_id,
      datamodel[0].maxkcal,
      datamodel[0].user_id,
      new DietCustomitzation('', '')
    );

    const hash: MealHash = this.buildHash(datamodel);

    return this.addMeals(diet, hash);
  }

  public datamodel(domain: Diet): DietTable {
    return {
      id: domain.id(),
      max_kcal: domain.maxKcal(),
      user_id: domain.userId(),
    };
  }

  private buildHash(datamodel: DietMealFoodJoin[]) {
    return datamodel.reduce((acc: MealHash, datamodel: DietMealFoodJoin) => {
      return {
        ...acc,
        [datamodel.diet_meal_name]: {
          id: datamodel.diet_meal_id,
          foods: datamodel.food_id
            ? [
                ...(acc[datamodel.diet_meal_name]
                  ? acc[datamodel.diet_meal_name].foods
                  : []),
                new Food(
                  datamodel.food_id,
                  datamodel.food_name,
                  datamodel.quantity,
                  datamodel.ch,
                  datamodel.fat,
                  datamodel.protein,
                  datamodel.fiber,
                  datamodel.kcal
                ),
              ]
            : [],
        },
      };
    }, {} as MealHash);
  }

  private addMeals(diet: Diet, mealHash: MealHash): Diet {
    Object.keys(mealHash).forEach((key) => {
      const meal = new Meal(
        mealHash[key].id,
        key,
        mealHash[key].foods,
        diet.id()
      );

      diet.addMeal(meal);
    });

    return diet;
  }
}
