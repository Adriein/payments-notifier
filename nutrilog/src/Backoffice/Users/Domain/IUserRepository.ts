import { User } from "./Entity/User.entity";
import { IRepository } from "../../../Shared/Domain/Interfaces/IRepository";
import { Either } from "../../../Shared/Domain/types";
import { UserNotExistError } from "./UserNotExistError";
import { Criteria } from "../../../Shared/Domain/Entities/Criteria";
import { UserFilter } from "./UserFilter";

export interface IUserRepository extends IRepository<User> {
  find(criteria: Criteria<UserFilter>): Promise<Either<Error | UserNotExistError, User[]>>;

  findByEmail(email: string): Promise<Either<Error | UserNotExistError, User>>;

  findUsersWithActiveSubscriptions(adminId: string): Promise<Either<Error | UserNotExistError, User[]>>

  findAdmins(): Promise<Either<Error | UserNotExistError, User[]>>;

  findUsersWithExpiredSubscriptions(adminId: string): Promise<Either<Error | UserNotExistError, User[]>>;

  findUsersNotWarned(adminId: string): Promise<Either<Error | UserNotExistError, User[]>>;
}