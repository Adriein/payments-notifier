import { IRepository } from "../../Shared/Domain/Interfaces/IRepository";
import { Auth } from "./Auth.entity";

export interface IAuthRepository extends IRepository<Auth> {}