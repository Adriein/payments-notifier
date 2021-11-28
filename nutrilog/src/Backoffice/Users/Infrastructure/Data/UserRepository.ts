import { IUserRepository } from "../../Domain/IUserRepository";
import { User } from "../../Domain/User.entity";
import { UserMapper } from "./UserMapper";
import { Log } from "../../../../Shared/Domain/Decorators/Log";
import { ADMIN_ROLE, USER_ROLE } from "../../../../Domain/constants";
import Database from "../../../../Shared/Infrastructure/Data/Database";

export class UserRepository implements IUserRepository {
  private mapper = new UserMapper();
  private prisma = Database.instance().connection();

  @Log(process.env.LOG_LEVEL)
  public async delete(user: User): Promise<void> {
    try {
      await this.prisma.user.update({
        where: {
          id: user.id()
        },
        data: {
          active: false,
        }
      });

      this.prisma.$disconnect();
    } catch (error) {
      this.prisma.$disconnect();
      throw error;
    }
  }

  @Log(process.env.LOG_LEVEL)
  public async find(adminId: string): Promise<User[]> {
    try {
      const results = await this.prisma.user.findMany({
        where: {
          role: {
            type: USER_ROLE
          },
          owner_id: adminId
        },
        include: {
          config: true,
          subscriptions: true,
          role: true,
          app_config: true,
        }
      });

      this.prisma.$disconnect();

      return results.map((result) => this.mapper.toDomain(result));
    } catch (error) {
      this.prisma.$disconnect();
      throw error;
    }
  }

  @Log(process.env.LOG_LEVEL)
  public async findOne(id: string): Promise<User | undefined> {
    try {
      const result = await this.prisma.user.findUnique({
        where: {
          id
        },
        include: {
          config: true,
          subscriptions: true,
          role: true,
          app_config: true,
        }
      });

      this.prisma.$disconnect();

      if (!result) {
        return undefined;
      }

      return this.mapper.toDomain(result);
    } catch (error) {
      this.prisma.$disconnect();
      throw error;
    }
  }

  @Log(process.env.LOG_LEVEL)
  public async save(entity: User): Promise<void> {
    try {
      const data = this.mapper.toSaveDataModel(entity);
      await this.prisma.user.create({ data });
      this.prisma.$disconnect();
    } catch (error) {
      this.prisma.$disconnect();
      throw error;
    }
  }

  @Log(process.env.LOG_LEVEL)
  public async update(entity: User): Promise<void> {
    try {
      const data = this.mapper.toUpdateDataModel(entity);
      await this.prisma.user.update({
        where: {
          id: entity.id()
        },
        data
      });

      this.prisma.$disconnect();
    } catch (error) {
      this.prisma.$disconnect();
      throw error;
    }
  }

  @Log(process.env.LOG_LEVEL)
  public async findByEmail(email: string): Promise<User | undefined> {
    const result = await this.prisma.user.findUnique({
      where: {
        email
      },
      include: {
        config: true,
        subscriptions: true,
        role: true,
        app_config: true,
      }
    });

    this.prisma.$disconnect();

    if (!result) {
      return undefined;
    }

    return this.mapper.toDomain(result);
  }

  @Log(process.env.LOG_LEVEL)
  public async findUsersWithActiveSubscriptions(adminId: string): Promise<User[]> {
    try {
      const results = await this.prisma.user.findMany({
        where: {
          owner_id: adminId,
          subscriptions: {
            some: {
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
          role: true,
          app_config: true,
        }
      });

      this.prisma.$disconnect();

      return results.map((result) => this.mapper.toDomain(result));
    } catch (error) {
      this.prisma.$disconnect();
      throw error;
    }
  }

  @Log(process.env.LOG_LEVEL)
  public async findAdmins(): Promise<User[]> {
    try {
      const results = await this.prisma.user.findMany({
        where: {
          role: {
            type: ADMIN_ROLE
          },
          subscriptions: {
            some: {
              active: true
            }
          }
        },
        include: {
          config: true,
          subscriptions: true,
          role: true,
          app_config: true,
        }
      });

      this.prisma.$disconnect();

      return results.map((result) => this.mapper.toDomain(result));
    } catch (error) {
      this.prisma.$disconnect();
      throw error;
    }
  }

  @Log(process.env.LOG_LEVEL)
  public async findUsersWithExpiredSubscriptions(adminId: string): Promise<User[]> {
    throw new Error("Method not implemented.");
  }

  @Log(process.env.LOG_LEVEL)
  public async findUsersNotWarned(adminId: string): Promise<User[]> {
    try {
      const results = await this.prisma.user.findMany({
        where: {
          config: {
            send_warnings: false
          }
        },
        include: {
          config: true,
          subscriptions: true,
          role: true,
          app_config: true,
        }
      });

      this.prisma.$disconnect();

      return results.map((result) => this.mapper.toDomain(result));
    } catch (error) {
      this.prisma.$disconnect();
      throw error;
    }
  }
}