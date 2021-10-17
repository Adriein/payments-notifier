import { IUserRepository } from "../../Domain/IUserRepository";
import { Criteria } from "../../../Shared/Domain/Entities/Criteria";
import { User } from "../../Domain/User.entity";
import { UserDAO } from "./User.dao";
import { UserMapper } from "./UserMapper";
import { SqlTranslator } from "../../../Shared/Domain/Entities/SqlTranslator";


export class UserRepository implements IUserRepository {
  private mapper = new UserMapper();

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
    const userDAO = this.mapper.toDataModel(entity);

    const [ subscriptionDAO ] = userDAO.subscriptions;
    const userConfigDAO = userDAO.userConfig;

    await userDAO.save();
    await subscriptionDAO.save();
    await userConfigDAO!.save();
  }

  public async update(entity: User): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const dao = new UserDAO();
    const criteria = new Criteria();

    criteria.field('email').equals(email);

    const [ result ] = await dao.find([ criteria ]);
    debug(result)
    if (!result) {
      return undefined;
    }

    return this.mapper.toDomain(result);
  }
}