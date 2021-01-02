import { User } from "../../../domain/entities/User.entity";
import { IMapper } from "../../../domain/interfaces";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";
import { GenericRepository } from "./GenericRepository";

export class UserRepository extends GenericRepository<User> implements IUserRepository{
    constructor(entity: string, mapper: IMapper<User>) {
        super(entity, mapper);
    }
    async findByName(username: string): Promise<User> {
        throw new Error();
    }

    async findAll(): Promise<User[]> {
        throw new Error();
    }
}