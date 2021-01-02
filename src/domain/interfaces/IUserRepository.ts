import { User } from "../entities/User.entity";
import { IRepository } from "./IRepository";

export interface IUserRepository extends IRepository<User> {
    findByName(username: string): Promise<User>;
    findAll(): Promise<User[]>;
}