import { IRepository } from '../../Shared/Domain/Interfaces/IRepository';
import { Nutrition } from './Nutrition.entity';

export interface INutritionRepository extends IRepository<Nutrition> {
  findByUserId(id: string): Promise<Nutrition>;
}
