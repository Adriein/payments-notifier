import { Diet } from '../../../Domain/Entities/Diet.entity';
import { GenericRepository } from './GenericRepository';
import { IDietRepository } from '../../../Domain/Interfaces/IDietRepository';
import { DietMapper } from '../Mappers/DietMapper';
import { CriteriaMapper } from '../Mappers/CriteriaMapper';
import { Log } from '../../../Domain/Decorators/Log';

export class DietRepository
  extends GenericRepository<Diet>
  implements IDietRepository
{
  constructor(
    protected entity: string,
    protected mapper: DietMapper,
    protected criteriaMapper: CriteriaMapper
  ) {
    super(entity, mapper, criteriaMapper);
  }

  @Log(process.env.LOG_LEVEL)
  async find(userId: string): Promise<Diet[]> {
    const query = `SELECT * FROM ${this.entity} LEFT JOIN diet_meal ON diet.id = diet_meal.diet_id WHERE diet.user_id = ${userId}`;
    const { rows } = await this.db.query(query);
    console.log(rows)

    return rows.map((row) => this.mapper.domain(row));
  }
}
