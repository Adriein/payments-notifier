import { IRepository } from "../../../Shared/Domain/Interfaces/IRepository";
import { AppFilter } from "./Entity/AppFilter.entity";
import { Either } from "../../../Shared/Domain/types";
import { Criteria } from "../../../Shared/Domain/Entities/Criteria";
import { AppFilterFilter } from "./Filter/AppFilterFilter";

export interface IAppFilterRepository extends IRepository<AppFilter> {
  find(criteria: Criteria<AppFilterFilter>): Promise<Either<Error, AppFilter[]>>
}