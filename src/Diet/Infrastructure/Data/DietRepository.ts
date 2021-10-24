import { Criteria } from '../../../Shared/Domain/Entities/Criteria';
import { IMapper } from '../../../Shared/Domain/Interfaces/IMapper';
import { Diet } from '../../Domain/Diet.entity';
import { IDietRepository } from '../../Domain/IDietRepository';
import { DietDAO } from './Diet.dao';
import { DietMapper } from './DietMapper';

export class DietRepository implements IDietRepository {
  private mapper: IMapper<Diet, DietDAO> = new DietMapper();

  public async findOne(id: string): Promise<Diet | undefined> {
    throw new Error('Method not implemented.');
  }

  public async find(criteria: any): Promise<Diet[]> {
    throw new Error('Method not implemented.');
  }

  public async save(entity: Diet): Promise<void> {

  }

  public async update(entity: Diet): Promise<void> {

  }

  public async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async findAll(nutritionId: string): Promise<Diet[]> {
    const dao = new DietDAO();
    const criteria = new Criteria();

    criteria.field('nutrition_id').equals(nutritionId);

    const results = await dao.find(criteria);

    if (!results) {
      return [];
    }

    return results.map((result: DietDAO) => this.mapper.toDomain(result));
  }

  public async getLastDiet(): Promise<Diet | undefined> {
    throw new Error('Method not implemented.');
  }
}
