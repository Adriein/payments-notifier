import { User } from "../entities/User.entity";
import { Email } from "../VO/Email.vo";
import { IRepository } from "./IRepository";

export interface IUserRepository extends IRepository<User> {
    findByName(username: string): Promise<User>;
    findByEmail(email: Email): Promise<User | undefined>;
    findAll(): Promise<User[]>;
    
}