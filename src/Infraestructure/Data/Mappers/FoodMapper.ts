import { IMapper } from '../../../Domain/Interfaces';
import { Food } from '../../../Domain/VO/Food.vo';

type FoodTable = {
  id: string;
  name: string;
  quantity: number;
  ch: number;
  fat: number;
  protein: number;
  fiber: number;
  kcal: number;
};

export class FoodMapper implements IMapper<Food> {
  public domain(foodDatamodel: FoodTable): Food {
    return new Food(
      foodDatamodel.id,
      foodDatamodel.name,
      foodDatamodel.quantity,
      foodDatamodel.ch,
      foodDatamodel.fat,
      foodDatamodel.protein,
      foodDatamodel.fiber,
      foodDatamodel.kcal
    );
  }
  public datamodel(domain: Food): FoodTable {
    return {
      id: domain.id(),
      name: domain.name(),
      quantity: domain.quantity(),
      ch: domain.ch(),
      fat: domain.fat(),
      protein: domain.protein(),
      fiber: domain.fiber(),
      kcal: domain.kcal(),
    };
  }
}
