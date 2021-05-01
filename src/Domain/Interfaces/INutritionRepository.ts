import { Nutrition } from '../Entities/Nutrition.entity';
import { IRepository } from './IRepository';

export interface INutritionRepository extends IRepository<Nutrition> {
  findByUserId(id: string): Promise<Nutrition | undefined>;
}
