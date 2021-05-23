import { Meal } from '../../../Domain/Entities/Meal.entity';
import { IMapper } from '../../../Domain/Interfaces';

type DietMealFoodJoin = {
  id: string;
  name: string;
  diet_id: string;
  food_id: string;
  food_name: string;
  food_quantity: number;
  ch: number;
  fat: number;
  protein: number;
  fiber: number;
  food_kcal: number;
};

type DietMealTable = {
  id: string;
  name: string;
  diet_id: string;
};

export class DietMealMapper implements IMapper<Meal> {
  public domain(datamodel: DietMealTable): Meal {
    throw new Error();
  }
  public datamodel(domain: Meal): DietMealTable {
    return {
      id: domain.id,
      name: domain.name,
      diet_id: '',
    };
  }
}
