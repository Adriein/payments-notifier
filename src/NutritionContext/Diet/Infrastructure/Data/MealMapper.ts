import { ID } from '../../../../Shared/Domain/VO/Id.vo';
import { IMapper } from '../../../../Shared/Domain/Interfaces/IMapper';
import { Meal } from '../../Domain/Meal.entity';
import { MealDAO } from './Meal.dao';

export class MealMapper implements IMapper<Meal, MealDAO> {
  public toDataModel(domain: Meal): MealDAO {
    return new MealDAO(
      domain.id(),
      domain.name(),
      domain.dietId(),
      domain.createdAt().toUTCString(),
      domain.updatedAt().toUTCString()
    );
  }

  toDomain(datamodel: MealDAO): Meal {
    return new Meal(
      new ID(datamodel.id!),
      datamodel.meal_name!,
      [],
      new ID(datamodel.diet_id!),
      new Date(datamodel.created_at!),
      new Date(datamodel.updated_at!)
    );
  }
}
