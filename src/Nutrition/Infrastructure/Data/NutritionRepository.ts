import { Criteria } from '../../../Domain/Entities/Criteria.entity';
import { IMapper } from '../../../Shared/Domain/Interfaces/IMapper';
import { INutritionRepository } from '../../Domain/INutritionRepository';
import { Nutrition } from '../../Domain/Nutrition.entity';
import { DietDAO } from './Diet.dao';
import { NutritionDAO } from './Nutrition.dao';
import { NutritionMapper } from './NutritionMapper';

export class NutritionRepository implements INutritionRepository {
  private mapper: IMapper<Nutrition, NutritionDAO> = new NutritionMapper();

  findOne(id: string): Promise<Nutrition | undefined> {
    throw new Error('Method not implemented.');
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

  findByUserId(id: string): Promise<Nutrition> {
    throw new Error('Method not implemented.');
  }
}
