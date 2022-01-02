import { IRepository } from '../../../Shared/Domain/Interfaces/IRepository';
import { Diet } from './Diet.entity';
import { Either } from "../../../Shared/Domain/types";
import { Criteria } from "../../../Shared/Domain/Entities/Criteria";

export interface IDietRepository extends IRepository<Diet> {
  find(criteria: Criteria<any>): Promise<Either<Error, Diet[]>>;
}
