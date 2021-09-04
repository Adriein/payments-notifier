import { IRepository } from '../../Shared/Domain/Interfaces/IRepository';
import { Food } from './Food.entity';

export interface IFoodRepository extends IRepository<Food> {
  search(term: string): Promise<Food[]>;
}
