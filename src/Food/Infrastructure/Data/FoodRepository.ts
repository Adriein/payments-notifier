import { Criteria } from '../../../Domain/Entities/Criteria.entity';
import { Food } from '../../Domain/Food.entity';
import { IFoodRepository } from '../../Domain/IFoodRepository';

export class FoodRepository implements IFoodRepository {
  search(term: string): Promise<Food[]> {
    throw new Error('Method not implemented.');
  }
  findOne(id: string): Promise<Food | undefined> {
    throw new Error('Method not implemented.');
  }
  find(adminId: string, criteria: Criteria): Promise<Food[]> {
    throw new Error('Method not implemented.');
  }
  save(entity: Food): Promise<void> {
    throw new Error('Method not implemented.');
  }
  update(entity: Food): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
