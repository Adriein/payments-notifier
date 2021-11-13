import { IMapper } from '../../../Shared/Domain/Interfaces/IMapper';
import { INutritionRepository } from '../../Domain/INutritionRepository';
import { Nutrition } from '../../Domain/Nutrition.entity';
import { NutritionDAO } from './Nutrition.dao';
import { NutritionMapper } from './NutritionMapper';
import { Criteria } from '../../../Shared/Domain/Entities/Criteria';

export class NutritionRepository implements INutritionRepository {
  private mapper: IMapper<Nutrition, NutritionDAO> = new NutritionMapper();

  async findOne(id: string): Promise<Nutrition | undefined> {
    throw new Error();
  }

  async find(criteria: any): Promise<Nutrition[]> {
    throw new Error('Method not implemented.');
  }

  async save(entity: Nutrition): Promise<void> {

  }

  async update(entity: Nutrition): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findByUserId(userId: string): Promise<Nutrition | undefined> {
    const dao = new NutritionDAO();
    const search = new Criteria();

    search.field('user_id').equals(userId);
    const nutrition = await dao.find(search);

    if (!nutrition) {
      return undefined;
    }

    return this.mapper.toDomain(nutrition[0]);
  }
}
