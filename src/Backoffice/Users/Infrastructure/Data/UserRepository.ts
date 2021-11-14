import { IUserRepository } from "../../Domain/IUserRepository";
import { Criteria } from "../../../../Shared/Domain/Entities/Criteria";
import { User } from "../../Domain/User.entity";
import { UserMapper } from "./UserMapper";
import { Log } from "../../../../Shared/Domain/Decorators/Log";
import { ADMIN_ROLE, USER_ROLE } from "../../../../Domain/constants";
import { Filter } from "../../../../Shared/Domain/Entities/Filter";
import Database from "../../../../Infraestructure/Data/Database";

export class UserRepository implements IUserRepository {
  private mapper = new UserMapper();
  private prisma = Database.getInstance().getConnection();

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
  public async find(criteria: Criteria): Promise<User[]> {
    const adminId = criteria.filters().find((filter: Filter) => filter.field() === 'owner_id');

    if (!adminId) {
      throw new Error('must send an admin id');
    }

    try {
      const results = await this.prisma.user.findMany({
        where: {
          owner_id: adminId.value(),
          ...criteria.translate()
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
    } catch
      (error) {
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
      await this.prisma.user.create({
        data: {
          id: entity.id(),
          username: entity.name(),
          email: entity.email(),
          password: entity.password(),
          owner_id: entity.ownerId(),
          active: entity.isActive(),
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
              active: entity.isSubscriptionActive(),
              expired: false,
              warned: entity.isWarned(),
              notified: entity.isNotified(),
              payment_date: entity.paymentDate(),
              created_at: new Date(),
              updated_at: new Date()
            }
          }
        }
      });
      this.prisma.$disconnect();
    } catch (error) {
      this.prisma.$disconnect();
      throw error;
    }
  }

  @Log(process.env.LOG_LEVEL)
  public async update(entity: User): Promise<void> {
    try {
      await this.prisma.user.update({
        where: {
          id: entity.id()
        },
        data: {
          username: entity.name(),
          email: entity.email(),
          password: entity.password(),
          owner_id: entity.ownerId(),
          active: entity.isActive(),
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
              active: entity.isSubscriptionActive(),
              expired: false,
              warned: entity.isWarned(),
              notified: entity.isNotified(),
              payment_date: entity.paymentDate(),
              created_at: new Date(),
              updated_at: new Date()
            }
          }
        }
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

  public async findUsersWithExpiredSubscriptions(adminId: string): Promise<User[]> {
    throw new Error("Method not implemented.");
  }

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