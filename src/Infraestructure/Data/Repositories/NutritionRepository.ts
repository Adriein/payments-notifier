import { GenericRepository } from './GenericRepository';
import { INutritionRepository } from '../../../Domain/Interfaces/INutritionRepository';
import { CriteriaMapper } from '../Mappers/CriteriaMapper';
import { Nutrition } from '../../../Domain/Entities/Nutrition.entity';
import { NutritionMapper } from '../Mappers/NutritionMapper';

export class AppConfigRepository
  extends GenericRepository<Nutrition>
  implements INutritionRepository {
  constructor(
    protected entity: string,
    protected mapper: NutritionMapper,
    protected criteriaMapper: CriteriaMapper
  ) {
    super(entity, mapper, criteriaMapper);
  }
}
