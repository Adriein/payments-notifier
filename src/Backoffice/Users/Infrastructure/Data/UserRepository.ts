import { IUserRepository } from "../../Domain/IUserRepository";
import { Criteria } from "../../../../Shared/Domain/Entities/Criteria";
import { User } from "../../Domain/User.entity";
import { UserMapper } from "./UserMapper";
import { Log } from "../../../../Shared/Domain/Decorators/Log";
import { Prisma, PrismaClient } from '@prisma/client'
import { USER_ROLE } from "../../../../Domain/constants";
import { Filter } from "../../../../Shared/Domain/Entities/Filter";

export class UserRepository implements IUserRepository {
  private mapper = new UserMapper();

  @Log(process.env.LOG_LEVEL)
  public async delete(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  @Log(process.env.LOG_LEVEL)
  public async find(criteria: Criteria): Promise<User[]> {
    const prisma = new PrismaClient();

    const adminId = criteria.filters().find((filter: Filter) => filter.field() === 'owner_id');

    if (!adminId) {
      throw new Error('must send an admin id');
    }

    try {
      const results = await prisma.user.findMany({
        where: {
          owner_id: adminId.value(),
          ...criteria.translate()
        },
        include: {
          config: true,
          subscriptions: true,
          role: true
        }
      });

      prisma.$disconnect();

      return results.map((result) => this.mapper.toDomain(result));
    } catch
      (error) {
      prisma.$disconnect();
      throw error;
    }
  }

  @Log(process.env.LOG_LEVEL)
  public async findOne(id: string): Promise<User | undefined> {
    const prisma = new PrismaClient();
    try {
      const result = await prisma.user.findUnique({
        where: {
          id
        },
        include: {
          config: true,
          subscriptions: true,
          role: true
        }
      });

      prisma.$disconnect();

      if (!result) {
        return undefined;
      }

      return this.mapper.toDomain(result);
    } catch (error) {
      prisma.$disconnect();
      throw error;
    }
  }

  @Log(process.env.LOG_LEVEL)
  public async save(entity: User): Promise<void> {
    const prisma = new PrismaClient();
    try {
      await prisma.user.create({ data: this.buildUserCreationInput(entity) });
    } catch (error) {
      prisma.$disconnect();
      throw error;
    }
  }

  @Log(process.env.LOG_LEVEL)
  public async update(entity: User): Promise<void> {
    throw new Error();
  }

  @Log(process.env.LOG_LEVEL)
  public async findByEmail(email: string): Promise<User | undefined> {
    const prisma = new PrismaClient();

    const result = await prisma.user.findUnique({
      where: {
        email
      },
      include: {
        config: true,
        subscriptions: true,
        role: true
      }
    });

    prisma.$disconnect();

    if (!result) {
      return undefined;
    }

    return this.mapper.toDomain(result);
  }

  @Log(process.env.LOG_LEVEL)
  public async findAllUsersByAdminWithActiveSubscriptions(adminId: string): Promise<User[]> {
    const prisma = new PrismaClient();
    try {
      const results = await prisma.user.findMany({
        where: {
          owner_id: adminId,
          subscriptions: {
            every: {
              active: true
            }
          },
          role: {
            type: USER_ROLE
          }
        },
        include: {
          config: true,
          subscriptions: true,
          role: true
        }
      });

      prisma.$disconnect();

      return results.map((result) => this.mapper.toDomain(result));
    } catch (error) {
      prisma.$disconnect();
      throw error;
    }
  }

  private buildUserCreationInput(entity: User): Prisma.userCreateInput {
    return {
      id: entity.id(),
      username: entity.name(),
      email: entity.email(),
      password: entity.password(),
      owner_id: entity.ownerId(),
      created_at: entity.createdAt(),
      updated_at: entity.updatedAt(),
      role: {
        connect: {
          id: entity.roleId(),
        }
      },
      config: {
        create: {
          id: entity.configId(),
          send_warnings: entity.sendWarnings(),
          send_notifications: entity.sendNotifications(),
          language: entity.language(),
          created_at: new Date(),
          updated_at: new Date()
        }
      },
      subscriptions: {
        create: {
          id: entity.subscriptionId(),
          pricing_id: entity.pricingId(),
          active: entity.isActive(),
          expired: false,
          warned: entity.isWarned(),
          notified: entity.isNotified(),
          payment_date: entity.paymentDate(),
          created_at: new Date(),
          updated_at: new Date()
        }
      }
    };
  }
}