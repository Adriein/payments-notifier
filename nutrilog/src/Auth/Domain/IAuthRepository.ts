import { IRepository } from "../../Shared/Domain/Interfaces/IRepository";
import { Auth } from "./Auth.entity";
import { Either } from "../../Shared/Domain/types";
import { NotAuthorizedError } from "./NotAuthorizedError";

export interface IAuthRepository extends IRepository<Auth> {
  findByEmail(email: string): Promise<Either<NotAuthorizedError | Error, Auth>>;
}