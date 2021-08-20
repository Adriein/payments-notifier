import { IMapper } from '../../../Shared/Domain/Interfaces/IMapper';
import { INutritionRepository } from '../../Domain/INutritionRepository';
import { Nutrition } from '../../Domain/Nutrition.entity';
import { NutritionDAO } from './Nutrition.dao';
import { NutritionMapper } from './NutritionMapper';
import { Criteria } from '../../../Shared/Domain/Entities/Criteria';
import { SqlTranslator } from '../../../Shared/Domain/Entities/SqlTranslator';
import { DietDAO } from './Diet.dao';

export class NutritionRepository implements INutritionRepository {
  private mapper: IMapper<Nutrition, NutritionDAO> = new NutritionMapper();

  async findOne(id: string): Promise<Nutrition | undefined> {
    const dao = new NutritionDAO(id);
    const result = await dao.getOne(['diet']);

    if (!result) {
      return undefined;
    }

    return this.mapper.domain(result);
  }

  async find(adminId: string, criteria: any): Promise<Nutrition[]> {
    throw new Error('Method not implemented.');
  }

  async save(entity: Nutrition): Promise<void> {
    const nutritionDAO = this.mapper.datamodel(entity);
    await nutritionDAO.save();
  }

  async update(entity: Nutrition): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async findByUserId(userId: string): Promise<Nutrition | undefined> {
    const dao = new NutritionDAO();
    const search = new Criteria(new SqlTranslator());

    search.field('user_id').equals(userId);
    const nutrition = await dao.find(search);

    if (!nutrition) {
      return undefined;
    }

    return this.mapper.domain(nutrition[0]);
  }

  async saveDiet(entity: Nutrition): Promise<void> {
    const dao = this.mapper.datamodel(entity);

    const newDietToSave = dao.diets[dao.diets.length - 1];
    
    newDietToSave.save();
  }
}
