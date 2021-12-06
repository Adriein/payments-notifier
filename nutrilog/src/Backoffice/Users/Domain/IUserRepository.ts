import { User } from "./Entity/User.entity";
import { IRepository } from "../../../Shared/Domain/Interfaces/IRepository";
import { Either } from "../../../Shared/Domain/types";
import { UserNotExistError } from "./UserNotExistError";

export interface IUserRepository extends IRepository<User> {
  find(adminId: string): Promise<Either<Error | UserNotExistError, User[]>>;
  
  findByEmail(email: string): Promise<Either<Error | UserNotExistError, User>>;

  findUsersWithActiveSubscriptions(adminId: string): Promise<Either<Error | UserNotExistError, User[]>>

  findAdmins(): Promise<Either<Error | UserNotExistError, User[]>>;

  findUsersWithExpiredSubscriptions(adminId: string): Promise<Either<Error | UserNotExistError, User[]>>;

  findUsersNotWarned(adminId: string): Promise<Either<Error | UserNotExistError, User[]>>;
}