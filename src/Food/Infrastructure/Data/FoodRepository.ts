import { Criteria } from '../../../Domain/Entities/Criteria.entity';
import { Food } from '../../Domain/Food.entity';
import { IFoodRepository } from '../../Domain/IFoodRepository';

export class FoodRepository implements IFoodRepository {
  public async search(term: string): Promise<Food[]> {
    return [];
  }
  public async findOne(id: string): Promise<Food | undefined> {
    throw new Error('Method not implemented.');
  }
  public async find(adminId: string, criteria: Criteria): Promise<Food[]> {
    throw new Error('Method not implemented.');
  }
  public async save(entity: Food): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public async update(entity: Food): Promise<void> {
    throw new Error('Method not implemented.');
  }
  public async delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
