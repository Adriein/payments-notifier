import { GenericRepository } from './GenericRepository';
import { INutritionRepository } from '../../../Domain/Interfaces/INutritionRepository';
import { CriteriaMapper } from '../Mappers/CriteriaMapper';
import { Nutrition } from '../../../Domain/Entities/Nutrition.entity';
import { NutritionMapper } from '../Mappers/NutritionMapper';

export class NutritionRepository
  extends GenericRepository<Nutrition>
  implements INutritionRepository {
  constructor(
    protected entity: string,
    protected mapper: NutritionMapper,
    protected criteriaMapper: CriteriaMapper
  ) {
    super(entity, mapper, criteriaMapper);
  }

  public async findByUserId(id: string): Promise<Nutrition | undefined> {
    const { rows } = await this.db.query(
      `SELECT * from ${this.entity} WHERE user_id='${id}'`
    );

    if (rows.length < 1) {
      return undefined;
    }

    return this.mapper.domain(rows[0]);
  }
}
