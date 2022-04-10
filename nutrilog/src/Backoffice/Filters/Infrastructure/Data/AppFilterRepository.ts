import { IAppFilterRepository } from "../../Domain/IAppFilterRepository";
import { Either } from "../../../../Shared/Domain/types";
import { AppFilter } from "../../Domain/Entity/AppFilter.entity";
import { Criteria } from "../../../../Shared/Domain/Entities/Criteria";
import { AppFilterFilter } from "../../Domain/Filter/AppFilterFilter";
import { Prisma } from "@prisma/client";
import { PrismaQueryBuilder } from "../../../../Shared/Infrastructure/Data/PrismaQueryBuilder";
import { Right } from "../../../../Shared/Domain/Entities/Right";
import { Left } from "../../../../Shared/Domain/Entities/Left";
import { AppFilterMysqlMapper } from "./AppFilterMysqlMapper";
import Database from "../../../../Shared/Infrastructure/Data/Database";
import { AppFilterMapper } from "./AppFilterMapper";
import { Log } from "../../../../Shared/Domain/Decorators/Log";

export class AppFilterRepository implements IAppFilterRepository {
  private mapper = new AppFilterMapper();
  private prisma = Database.instance().connection();

  delete(entity: AppFilter): Promise<void> {
    return Promise.resolve(undefined);
  }

  @Log(process.env.LOG_LEVEL)
  public async find(criteria: Criteria<AppFilterFilter>): Promise<Either<Error, AppFilter[]>> {
    try {
      const queryBuilder = new PrismaQueryBuilder<AppFilterFilter, AppFilterMysqlMapper>(
        criteria,
        new AppFilterMysqlMapper()
      );

      const query = queryBuilder.build<Prisma.app_filterWhereInput>();

      const pagination = queryBuilder.pagination();
      const order = queryBuilder.orderBy();

      const results = await this.prisma.app_filter.findMany({
        ...pagination,
        ...order,
        where: query,
      });

      this.prisma.$disconnect();

      return Right.success(this.mapper.toDomain(results))
    } catch (error: any) {
      this.prisma.$disconnect();
      return Left.error(error);
    }
  }

  findOne(id: string): Promise<Either<Error, AppFilter>> {
    throw new Error();
  }

  save(entity: AppFilter): Promise<void> {
    return Promise.resolve(undefined);
  }

  update(entity: AppFilter): Promise<void> {
    return Promise.resolve(undefined);
  }

}