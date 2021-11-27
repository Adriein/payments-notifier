import { Food } from '../../Domain/Food.entity';
import { IFoodRepository } from '../../Domain/IFoodRepository';
import { Criteria } from "../../../../Shared/Domain/Entities/Criteria";

export class FoodRepository implements IFoodRepository {
  public async search(term: string): Promise<Food[]> {
    return [];
  }

  public async findOne(id: string): Promise<Food | undefined> {
    throw new Error('Method not implemented.');
  }

  public async find(criteria: Criteria): Promise<Food[]> {
    throw new Error('Method not implemented.');
  }

  public async save(entity: Food): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async update(entity: Food): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async delete(entity: Food): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
