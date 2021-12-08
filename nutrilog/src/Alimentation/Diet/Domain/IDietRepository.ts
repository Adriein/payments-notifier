import { IRepository } from '../../../Shared/Domain/Interfaces/IRepository';
import { Diet } from './Diet.entity';
import { Either } from "../../../Shared/Domain/types";

export interface IDietRepository extends IRepository<Diet> {
  find(nutritionId: string): Promise<Either<Error, Diet[]>>;
}
