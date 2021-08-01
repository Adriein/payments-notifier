import { Criteria } from '../../../Domain/Entities/Criteria.entity';
import { IMapper } from '../../../Shared/Domain/Interfaces/IMapper';
import { INutritionRepository } from '../../Domain/INutritionRepository';
import { Nutrition } from '../../Domain/Nutrition.entity';
import { DietDAO } from './Diet.dao';
import { NutritionDAO } from './Nutrition.dao';
import { NutritionMapper } from './NutritionMapper';

export class NutritionRepository implements INutritionRepository {
  private mapper: IMapper<Nutrition, NutritionDAO> = new NutritionMapper();

  async findOne(id: string): Promise<Nutrition | undefined> {
    const dao = new NutritionDAO(id);
    const result = await dao.getOne();

    if (!result) {
      return undefined;
    }

    return this.mapper.domain(result);
  }

  find(adminId: string, criteria: Criteria): Promise<Nutrition[]> {
    throw new Error('Method not implemented.');
  }

  async save(entity: Nutrition): Promise<void> {
    const nutritionDAO = this.mapper.datamodel(entity);
    await nutritionDAO.save();
  }

  update(entity: Nutrition): Promise<void> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findByUserId(userId: string): Promise<Nutrition> {
    // Criteria.field('user_id').equal(userId);
    throw new Error('Method not implemented.');
  }
}
