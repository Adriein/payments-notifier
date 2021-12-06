import { Food } from '../../Domain/Food.entity';
import { IFoodRepository } from '../../Domain/IFoodRepository';
import { Either } from "../../../../Shared/Domain/types";

export class FoodRepository implements IFoodRepository {
  delete(entity: Food): Promise<void> {
    return Promise.resolve(undefined);
  }

  find(adminId: string): Promise<Either<Error, Food[]>> {
    throw new Error('not implemented');
  }

  findOne(id: string): Promise<Either<Error, Food>> {
    throw new Error('not implemented');
  }

  save(entity: Food): Promise<void> {
    return Promise.resolve(undefined);
  }

  search(term: string, maxSearch?: number): Promise<Food[]> {
    return Promise.resolve([]);
  }

  update(entity: Food): Promise<void> {
    return Promise.resolve(undefined);
  }

}
