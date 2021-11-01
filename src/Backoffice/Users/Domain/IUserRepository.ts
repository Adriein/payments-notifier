import { User } from "./User.entity";
import { IRepository } from "../../../Shared/Domain/Interfaces/IRepository";

export interface IUserRepository extends IRepository<User> {
  findByEmail(email: string): Promise<User | undefined>;

  saveSubscription(user: User): Promise<void>;
}