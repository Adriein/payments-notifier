import { IRepository } from "../../Shared/Domain/Interfaces/IRepository";
import { User } from "./User.entity";

export interface IUserRepository extends IRepository<User> {
}