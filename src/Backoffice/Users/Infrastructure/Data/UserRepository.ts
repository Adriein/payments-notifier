import { IUserRepository } from "../../Domain/IUserRepository";
import { Criteria } from "../../../../Shared/Domain/Entities/Criteria";
import { User } from "../../Domain/User.entity";
import { UserDAO } from "./User.dao";
import { UserMapper } from "./UserMapper";
import { Log } from "../../../../Shared/Domain/Decorators/Log";
import { PrismaClient } from '@prisma/client'

export class UserRepository implements IUserRepository {
  private mapper = new UserMapper();

  @Log(process.env.LOG_LEVEL)
  public async delete(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  @Log(process.env.LOG_LEVEL)
  public async find(criteria?: Criteria): Promise<User[]> {
    const dao = new UserDAO();

    const results = await dao.find(criteria);

    return results.map((dao: UserDAO) => this.mapper.toDomain(dao));
  }

  @Log(process.env.LOG_LEVEL)
  public async findOne(id: string): Promise<User | undefined> {
    const dao = new UserDAO();
    dao.id = id;

    const userDAO = await dao.getOne();

    if (!userDAO) {
      return undefined;
    }

    return this.mapper.toDomain(userDAO);
  }

  @Log(process.env.LOG_LEVEL)
  public async save(entity: User): Promise<void> {
    const userDAO = this.mapper.toDataModel(entity);

    const [ subscriptionDAO ] = userDAO.subscriptions;
    const userConfigDAO = userDAO.userConfig;

    const existingUser = userDAO.getOne();

    if (existingUser) {
      await subscriptionDAO.save();
      return await Promise.resolve();
    }

    await userDAO.save();
    await subscriptionDAO.save();
    await userConfigDAO!.save();
  }

  @Log(process.env.LOG_LEVEL)
  public async update(entity: User): Promise<void> {
    const userDAO = this.mapper.toDataModel(entity);

    const [ subscriptionDAO ] = userDAO.subscriptions;
    const userConfigDAO = userDAO.userConfig;

    await userDAO.update();
    await subscriptionDAO.update();
    await userConfigDAO!.update();

  }

  @Log(process.env.LOG_LEVEL)
  public async findByEmail(email: string): Promise<User | undefined> {
    /*const dao = new UserDAO();
     const criteria = new Criteria();

     criteria.field('email').equals(email);

     const [ result ] = await dao.find(criteria);

     if (!result) {
     return undefined;
     }*/
    const prisma = new PrismaClient()

    const result = await prisma.user.findUnique({
      where: {
        email
      },
    });
    prisma.$disconnect();

    if (!result) {
      return undefined;
    }

    return this.mapper.toDomain(result);
  }

  @Log(process.env.LOG_LEVEL)
  public async findAllUsersByAdminWithActiveSubscriptions(adminId: string): Promise<User[]> {
    const dao = new UserDAO();
    const criteria = new Criteria();

    criteria.field('owner_id').equals(adminId);
    criteria.field('subscriptions.active').equals('true');
    criteria.field('config.role').equals('user');

    const results = await dao.find(criteria);

    return results.map((dao: UserDAO) => this.mapper.toDomain(dao));
  }
}