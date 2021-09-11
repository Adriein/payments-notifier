import { IMapper } from '../../../Shared/Domain/Interfaces/IMapper';
import { Food } from '../../Domain/Food.entity';
import { MicroNutrients } from '../../Domain/MicroNutrients.entity';
import { NutrientsFood } from './NutritionixApiNutrients.response.api';

export class FoodApiMapper implements IMapper<Food, any> {
  datamodel(domain: Food): any {
    throw new Error('Method not implemented.');
  }
  domain(datamodel: NutrientsFood): Food {
    return Food.build(
      datamodel.food_name,
      datamodel.serving_unit,
      Number(datamodel.serving_qty),
      datamodel.photo.thumb,
      []
    );
  }
}
