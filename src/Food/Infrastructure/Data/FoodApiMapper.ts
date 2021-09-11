import { IMapper } from '../../../Shared/Domain/Interfaces/IMapper';
import { Food } from '../../Domain/Food.entity';
import { MicroNutrients } from '../../Domain/MicroNutrients.entity';
import { NutrientsFood } from './NutritionixApiNutrients.response.api';

export class FoodApiMapper implements IMapper<Food, any> {
  datamodel(domain: Food): any {
    throw new Error('Method not implemented.');
  }
  domain(datamodel: NutrientsFood): Food {
    const micro: MicroNutrients[] = [];
    micro.push(new MicroNutrients('carbohydrates', datamodel.nf_total_carbohydrate));
    micro.push(new MicroNutrients('total_fat', datamodel.nf_total_fat));
    micro.push(new MicroNutrients('saturated_fat', datamodel.nf_saturated_fat));
    micro.push(new MicroNutrients('cholesterol', datamodel.nf_cholesterol));
    micro.push(new MicroNutrients('sodium', datamodel.nf_sodium));
    micro.push(new MicroNutrients('protein', datamodel.nf_protein));
    micro.push(new MicroNutrients('sugars', datamodel.nf_sugars));
    micro.push(new MicroNutrients('potasium', datamodel.nf_potassium));
    micro.push(new MicroNutrients('fiber', datamodel.nf_dietary_fiber));

    return Food.build(
      datamodel.food_name,
      datamodel.serving_unit,
      Number(datamodel.serving_qty),
      datamodel.photo.thumb,
      datamodel.nf_calories,
      micro
    );
  }
}
