import { Log } from "../../../../Shared/Domain/Decorators/Log";
import Database from "../../../../Shared/Infrastructure/Data/Database";
import { Either } from "../../../../Shared/Domain/types";
import { Left } from "../../../../Shared/Domain/Entities/Left";
import { Right } from "../../../../Shared/Domain/Entities/Right";
import { Criteria } from "../../../../Shared/Domain/Entities/Criteria";
import { PrismaQueryBuilder } from "../../../../Shared/Infrastructure/Data/PrismaQueryBuilder";
import { Prisma } from "@prisma/client";
import { SubscriptionMapper } from "./SubscriptionMapper";
import { Subscription } from "../../Domain/Entity/Subscription.entity";
import { ISubscriptionRepository } from "../../Domain/ISubscriptionRepository";
import { SubscriptionFilter } from "../../Domain/Filter/SubscriptionFilter";
import { SubscriptionMysqlMapper } from "./SubscriptionMysqlMapper";

export class SubscriptionRepository implements ISubscriptionRepository {
  private mapper = new SubscriptionMapper();
  private prisma = Database.instance().connection();

  @Log(process.env.LOG_LEVEL)
  public async delete(subscription: Subscription): Promise<void> {
    try {
      await this.prisma.subscription.update({
        where: {
          id: subscription.id().value
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
  public async find(criteria: Criteria<SubscriptionFilter>): Promise<Either<Error, Subscription[]>> {
    try {
      const queryBuilder = new PrismaQueryBuilder<SubscriptionFilter, SubscriptionMysqlMapper>(
        criteria,
        new SubscriptionMysqlMapper()
      );
      const query = queryBuilder.build<Prisma.subscriptionWhereInput>();

      const pagination = queryBuilder.pagination();

      const results = await this.prisma.subscription.findMany({
        ...pagination,
        where: query,
        include: {
          history: true
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
  public async findOne(id: string): Promise<Either<Error, Subscription>> {
    try {
      const result = await this.prisma.subscription.findUnique({
        where: {
          id
        },
        include: {
          history: true
        }
      });

      this.prisma.$disconnect();

      if (!result) {
        return Left.error(new Error(`Subscription with id: ${id} not found`));
      }

      return Right.success(this.mapper.toDomain(result));
    } catch (error: any) {
      this.prisma.$disconnect();
      return Left.error(error);
    }
  }

  @Log(process.env.LOG_LEVEL)
  public async save(entity: Subscription): Promise<void> {
    try {
      const data = this.mapper.toSaveDataModel(entity);
      await this.prisma.subscription.create({ data });
      this.prisma.$disconnect();
    } catch (error: any) {
      this.prisma.$disconnect();
      throw error;
    }
  }

  @Log(process.env.LOG_LEVEL)
  public async update(entity: Subscription): Promise<void> {
    try {
      const data = this.mapper.toUpdateDataModel(entity);
      await this.prisma.subscription.update({
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
}