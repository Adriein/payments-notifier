import { IRepository } from '../../../Shared/Domain/Interfaces/IRepository';
import { Nutrition } from './Nutrition.entity';
import { Either } from "../../../Shared/Domain/types";
import { NutritionNotExistsError } from "./NutritionNotExistsError";

export interface INutritionRepository extends IRepository<Nutrition> {
  findByUserId(id: string): Promise<Either<Error | NutritionNotExistsError, Nutrition>>;

  findOne(id: string): Promise<Either<Error | NutritionNotExistsError, Nutrition>>;
}
