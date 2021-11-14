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

  async delete(entity: Nutrition): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findByUserId(userId: string): Promise<Nutrition | undefined> {
    throw new Error();
  }
}
