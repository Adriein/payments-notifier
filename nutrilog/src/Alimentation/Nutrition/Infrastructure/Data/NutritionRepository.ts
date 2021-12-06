import { IMapper } from '../../../../Shared/Domain/Interfaces/IMapper';
import { INutritionRepository } from '../../Domain/INutritionRepository';
import { Nutrition } from '../../Domain/Nutrition.entity';
import { NutritionMapper } from './NutritionMapper';
import { Either } from "../../../../Shared/Domain/types";
import { NutritionNotExistsError } from "../../Domain/NutritionNotExistsError";

export class NutritionRepository implements INutritionRepository {
  delete(entity: Nutrition): Promise<void> {
    return Promise.resolve(undefined);
  }

  find(adminId: string): Promise<Either<Error, Nutrition[]>> {
    throw new Error('not implemented');
  }

  findByUserId(id: string): Promise<Either<Error | NutritionNotExistsError, Nutrition>> {
    throw new Error('not implemented');
  }

  findOne(id: string): Promise<Either<Error, Nutrition>> {
    throw new Error('not implemented');
  }

  save(entity: Nutrition): Promise<void> {
    return Promise.resolve(undefined);
  }

  update(entity: Nutrition): Promise<void> {
    return Promise.resolve(undefined);
  }

}
