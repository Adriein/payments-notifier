import { IUserRepository } from "../../Domain/IUserRepository";
import { Criteria } from "../../../Shared/Domain/Entities/Criteria";
import { User } from "../../Domain/User.entity";

export class UserRepository implements IUserRepository {
  public async delete(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async find(): Promise<User[]> {
    return Promise.resolve([]);
  }

  public async findOne(id: string): Promise<User | undefined> {
    return Promise.resolve(undefined);
  }

  public async save(entity: User): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async update(entity: User): Promise<void> {
    return Promise.resolve(undefined);
  }
}