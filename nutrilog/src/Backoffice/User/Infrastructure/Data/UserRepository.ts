import { IUserRepository } from "../../Domain/IUserRepository";
import { User } from "../../Domain/Entity/User.entity";
import { UserMapper } from "./UserMapper";
import { Log } from "../../../../Shared/Domain/Decorators/Log";
import { ADMIN_ROLE, USER_ROLE } from "../../Domain/constants";
import Database from "../../../../Shared/Infrastructure/Data/Database";
import { Either } from "../../../../Shared/Domain/types";
import { UserNotExistError } from "../../Domain/UserNotExistError";
import { Left } from "../../../../Shared/Domain/Entities/Left";
import { Right } from "../../../../Shared/Domain/Entities/Right";
import { Criteria } from "../../../../Shared/Domain/Entities/Criteria";
import { UserFilter } from "../../Domain/UserFilter";
import { PrismaQueryBuilder } from "../../../../Shared/Infrastructure/Data/PrismaQueryBuilder";
import { UserMysqlMapper } from "./UserMysqlMapper";
import { Prisma } from "@prisma/client";

export class UserRepository implements IUserRepository {
  private mapper = new UserMapper();
  private prisma = Database.instance().connection();

  @Log(process.env.LOG_LEVEL)
  public async delete(user: User): Promise<void> {
    try {
      await this.prisma.user.update({
        where: {
          id: user.id().value
        },
        data: {
          active: false,
        }
      });

      this.prisma.$disconnect();
    } catch (error: any) {
      this.prisma.$disconnect();
      throw error;
    }
  }

  @Log(process.env.LOG_LEVEL)
  public async find(criteria: Criteria<UserFilter>): Promise<Either<Error | UserNotExistError, User[]>> {
    try {
      const queryBuilder = new PrismaQueryBuilder<UserFilter, UserMysqlMapper>(criteria, new UserMysqlMapper());
      const query = queryBuilder.build<Prisma.userWhereInput>();

      const pagination = queryBuilder.pagination();

      const results = await this.prisma.user.findMany({
        ...pagination,
        where: query,
        include: {
          config: true,
          subscriptions: true,
          role: true,
          app_config: true,
        }
      });

      this.prisma.$disconnect();

      return Right.success(results.map((result) => this.mapper.toDomain(result)))
    } catch (error: any) {
      this.prisma.$disconnect();
      return Left.error(error);
    }
  }

  @Log(process.env.LOG_LEVEL)
  public async findOne(id: string): Promise<Either<Error | UserNotExistError, User>> {
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
        return Left.error(new UserNotExistError(`User with id: ${id} not found`));
      }

      return Right.success(this.mapper.toDomain(result));
    } catch (error: any) {
      this.prisma.$disconnect();
      return Left.error(error);
    }
  }

  @Log(process.env.LOG_LEVEL)
  public async save(entity: User): Promise<void> {
    try {
      const data = this.mapper.toSaveDataModel(entity);
      await this.prisma.user.create({ data });
      this.prisma.$disconnect();
    } catch (error: any) {
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
          id: entity.id().value
        },
        data
      });

      this.prisma.$disconnect();
    } catch (error: any) {
      this.prisma.$disconnect();
      throw error;
    }
  }

  @Log(process.env.LOG_LEVEL)
  public async findByEmail(email: string): Promise<Either<Error | UserNotExistError, User>> {
    try {
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
        return Left.error(new UserNotExistError(`User with email: ${email} not exists`));
      }

      return Right.success(this.mapper.toDomain(result));
    } catch (error: any) {
      this.prisma.$disconnect();
      return Left.error(error);
    }
  }

  @Log(process.env.LOG_LEVEL)
  public async findUsersWithActiveSubscriptions(adminId: string): Promise<Either<Error | UserNotExistError, User[]>> {
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

      if (results.length === 0) {
        return Left.error(new UserNotExistError(`Admin with id: ${adminId} has no users with subscriptions active`));
      }

      return Right.success(results.map((result) => this.mapper.toDomain(result)));
    } catch (error: any) {
      this.prisma.$disconnect();
      return Left.error(error);
    }
  }

  @Log(process.env.LOG_LEVEL)
  public async findAdmins(): Promise<Either<Error | UserNotExistError, User[]>> {
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

      return Right.success(results.map((result) => this.mapper.toDomain(result)));
    } catch (error: any) {
      this.prisma.$disconnect();
      return Left.error(error);
    }
  }

  @Log(process.env.LOG_LEVEL)
  public async findUsersWithExpiredSubscriptions(adminId: string): Promise<Either<Error | UserNotExistError, User[]>> {
    throw new Error("Method not implemented.");
  }

  @Log(process.env.LOG_LEVEL)
  public async findUsersNotWarned(adminId: string): Promise<Either<Error | UserNotExistError, User[]>> {
    try {
      const results = await this.prisma.user.findMany({
        where: {
          config: {
            send_warnings: true
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

      if (results.length === 0) {
        return Left.error(new UserNotExistError(`Admin with id: ${adminId} has no users not warned`))
      }

      return Right.success(results.map((result) => this.mapper.toDomain(result)));
    } catch (error: any) {
      this.prisma.$disconnect();
      return Left.error(error);
    }
  }

  @Log(process.env.LOG_LEVEL)
  public async countTotalUsers(adminId: string): Promise<Either<Error, number>> {
    try {
      const result = await this.prisma.user.count({
        where: {
          owner_id: adminId
        }
      });

      this.prisma.$disconnect();

      return Right.success(result);
    } catch (error: any) {
      this.prisma.$disconnect();
      return Left.error(error);
    }
  }
}