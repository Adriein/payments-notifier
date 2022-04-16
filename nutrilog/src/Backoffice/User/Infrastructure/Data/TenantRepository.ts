import { Log } from "../../../../Shared/Domain/Decorators/Log";
import Database from "../../../../Shared/Infrastructure/Data/Database";
import { Either } from "../../../../Shared/Domain/types";
import { UserNotExistError } from "../../Domain/Error/UserNotExistError";
import { Left } from "../../../../Shared/Domain/Entities/Left";
import { Right } from "../../../../Shared/Domain/Entities/Right";
import { Criteria } from "../../../../Shared/Domain/Entities/Criteria";
import { ClientRepositoryFilter } from "../../Domain/Filter/ClientRepositoryFilter";
import { PrismaQueryBuilder } from "../../../../Shared/Infrastructure/Data/PrismaQueryBuilder";
import { UserMysqlMapper } from "./UserMysqlMapper";
import { Prisma } from "@prisma/client";
import { ITenantRepository } from "../../Domain/ITenantRepository";
import { Tenant } from "../../Domain/Entity/Tenant.entity";
import { TenantMapper } from "./TenantMapper";

export class TenantRepository implements ITenantRepository {
  private mapper = new TenantMapper();
  private prisma = Database.instance().connection();

  @Log(process.env.LOG_LEVEL)
  public async delete(tenant: Tenant): Promise<void> {
    try {
      await this.prisma.user.update({
        where: {
          id: tenant.id().value
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
  public async find(criteria: Criteria<ClientRepositoryFilter>): Promise<Either<Error | UserNotExistError, Tenant[]>> {
    try {
      const queryBuilder = new PrismaQueryBuilder<ClientRepositoryFilter, UserMysqlMapper>(
        criteria,
        new UserMysqlMapper()
      );
      const query = queryBuilder.build<Prisma.userWhereInput>();

      const pagination = queryBuilder.pagination();
      const order = queryBuilder.orderBy();

      const results = await this.prisma.user.findMany({
        ...pagination,
        ...order,
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
  public async findOne(id: string): Promise<Either<Error | UserNotExistError, Tenant>> {
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
  public async save(entity: Tenant): Promise<void> {
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
  public async update(entity: Tenant): Promise<void> {
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
  public async findByEmail(email: string): Promise<Either<Error | UserNotExistError, Tenant>> {
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