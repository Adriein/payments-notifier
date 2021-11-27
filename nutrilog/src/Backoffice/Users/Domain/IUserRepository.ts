import { User } from "./User.entity";
import { IRepository } from "../../../Shared/Domain/Interfaces/IRepository";

export interface IUserRepository extends IRepository<User> {
  findByEmail(email: string): Promise<User | undefined>;

  findUsersWithActiveSubscriptions(adminId: string): Promise<User[]>

  findAdmins(): Promise<User[]>;

  findUsersWithExpiredSubscriptions(adminId: string): Promise<User[]>;

  findUsersNotWarned(adminId: string): Promise<User[]>;
}