import { ID } from '../../../Domain/VO/Id.vo';
import { DietType } from '../../Domain/VO/DietType.vo';
import { IMapper } from '../../../Shared/Domain/Interfaces/IMapper';
import { Diet } from '../../Domain/Diet.entity';
import { DietDAO } from './Diet.dao';
import { MealMapper } from './MealMapper';

export class DietMapper implements IMapper<Diet, DietDAO> {
  private mealMapper = new MealMapper();

  public datamodel(domain: Diet): DietDAO {
    const meals = domain.meals().map(this.mealMapper.datamodel);

    return new DietDAO(
      domain.id(),
      domain.name(),
      domain.objective(),
      domain.kcal(),
      domain.nutritionId(),
      domain.createdAt().toUTCString(),
      domain.updatedAt().toUTCString(),
      meals
    );
  }

  domain(datamodel: DietDAO): Diet {

    return new Diet(
      new ID(datamodel.id!),
      datamodel.diet_name!,
      new ID(datamodel.nutrition_id!),
      new DietType(datamodel.objective!),
      datamodel.kcal!,
      [],
      new Date(datamodel.created_at!),
      new Date(datamodel.updated_at!)
    );
  }
}
