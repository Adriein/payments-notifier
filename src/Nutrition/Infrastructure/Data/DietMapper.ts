import { ID } from '../../../Domain/VO/Id.vo';
import { DietType } from '../../Domain/VO/DietType.vo';
import { IMapper } from '../../../Shared/Domain/Interfaces/IMapper';
import { Diet } from '../../Domain/Diet.entity';
import { DietDAO } from './Diet.dao';

export class DietMapper implements IMapper<Diet, DietDAO> {
  public datamodel(domain: Diet): DietDAO {
    return new DietDAO(
      domain.id(),
      domain.name(),
      domain.objective(),
      domain.kcal(),
      domain.nutritionId(),
      domain.createdAt().toString(),
      domain.updatedAt().toString()
    );
  }

  domain(datamodel: DietDAO): Diet {
    return new Diet(
      new ID(datamodel.id!),
      datamodel.diet_name!,
      new ID(datamodel.nutrition_id!),
      new DietType(datamodel.objective!),
      datamodel.kcal!,
      new Date(datamodel.created_at!),
      new Date(datamodel.updated_at!)
    );
  }
}
