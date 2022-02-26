import { IRepository } from "../../../Shared/Domain/Interfaces/IRepository";
import { Either } from "../../../Shared/Domain/types";
import { UserNotExistError } from "./Error/UserNotExistError";
import { Criteria } from "../../../Shared/Domain/Entities/Criteria";
import { UserFilter } from "./Filter/UserFilter";
import { Client } from "./Entity/Client.entity";

export interface IClientRepository extends IRepository<Client> {
  find(criteria: Criteria<UserFilter>): Promise<Either<Error | UserNotExistError, Client[]>>;

  findByEmail(email: string): Promise<Either<Error | UserNotExistError, Client>>;
  
  countTotalUsers(adminId: string): Promise<Either<Error, number>>;
}