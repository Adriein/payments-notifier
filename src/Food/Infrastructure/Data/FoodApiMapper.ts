import { IMapper } from '../../../Shared/Domain/Interfaces/IMapper';
import { Food } from '../../Domain/Food.entity';
import { MicroNutrients } from '../../Domain/MicroNutrients.entity';

export class FoodApiMapper implements IMapper<Food, any> {
  datamodel(domain: Food): any {
    throw new Error('Method not implemented.');
  }
  domain(datamodel: any): Food {
    return Food.build(datamodel.name, datamodel.unit, []);
  }
}
