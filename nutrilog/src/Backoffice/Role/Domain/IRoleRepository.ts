import { IRepository } from "../../../Shared/Domain/Interfaces/IRepository";
import { Role } from "./Role";
import { Either } from "../../../Shared/Domain/types";

export interface IRoleRepository extends IRepository<Role> {
  search(role: string): Promise<Either<Error, Role[]>>;
}