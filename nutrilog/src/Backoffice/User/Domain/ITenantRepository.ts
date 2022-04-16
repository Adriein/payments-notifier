import { IRepository } from "../../../Shared/Domain/Interfaces/IRepository";
import { Either } from "../../../Shared/Domain/types";
import { UserNotExistError } from "./Error/UserNotExistError";
import { Criteria } from "../../../Shared/Domain/Entities/Criteria";
import { ClientRepositoryFilter } from "./Filter/ClientRepositoryFilter";
import { Tenant } from "./Entity/Tenant.entity";

export interface ITenantRepository extends IRepository<Tenant> {
  find(criteria: Criteria<ClientRepositoryFilter>): Promise<Either<Error | UserNotExistError, Tenant[]>>;

  findByEmail(email: string): Promise<Either<Error | UserNotExistError, Tenant>>;

  countTotalUsers(adminId: string): Promise<Either<Error, number>>;
}