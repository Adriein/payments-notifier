import { IPricingRepository } from "../../Domain/IPricingRepository";
import { Pricing } from "../../Domain/Pricing.entity";
import { PricingMapper } from "./PricingMapper";
import Database from "../../../../Shared/Infrastructure/Data/Database";
import { Log } from "../../../../Shared/Domain/Decorators/Log";
import { Either } from "../../../../Shared/Domain/types";
import { Left } from "../../../../Shared/Domain/Entities/Left";
import { PricingNotExistsError } from "../../Domain/PricingNotExistsError";
import { Right } from "../../../../Shared/Domain/Entities/Right";

export class PricingRepository implements IPricingRepository {
  private readonly mapper = new PricingMapper();
  private prisma = Database.instance().connection();

  delete(entity: Pricing): Promise<void> {
    throw new Error('Not implemented yet');
  }

  public async find(criteria: any): Promise<Either<Error, Pricing[]>> {
    throw new Error('Not implemented yet');
  }

  @Log(process.env.LOG_LEVEL)
  public async findOne(id: string): Promise<Either<Error, Pricing>> {
    try {
      const result = await this.prisma.pricing.findUnique({
        where: {
          id
        }
      });

      this.prisma.$disconnect();

      if (!result) {
        return Left.error(new PricingNotExistsError(`Pricing with id: ${id} not exists`));
      }

      return Right.success(this.mapper.toDomain(result));
    } catch (error: any) {
      this.prisma.$disconnect();
      return Left.error(error);
    }
  }

  @Log(process.env.LOG_LEVEL)
  public async save(entity: Pricing): Promise<void> {
    try {
      const data = this.mapper.toSaveDataModel(entity);

      await this.prisma.pricing.create({ data });
      this.prisma.$disconnect();
    } catch (error: any) {
      this.prisma.$disconnect();
      throw error;
    }
  }

  update(entity: Pricing): Promise<void> {
    throw new Error('Not implemented yet');
  }

  @Log(process.env.LOG_LEVEL)
  public async search(pricingName: string): Promise<Either<Error, Pricing[]>> {
    try {
      const results = await this.prisma.pricing.findMany({
        where: {
          pricing_name: pricingName
        }
      });

      this.prisma.$disconnect();

      if (results.length === 0) {
        return Right.success([]);
      }

      return Right.success(results.map((result) => this.mapper.toDomain(result)));
    } catch (error: any) {
      this.prisma.$disconnect();
      return Left.error(error);
    }
  }

  @Log(process.env.LOG_LEVEL)
  public async findAll(adminId: string): Promise<Either<Error | PricingNotExistsError, Pricing[]>> {
    try {
      const results = await this.prisma.pricing.findMany({
        where: {
          user_id: adminId
        }
      });

      this.prisma.$disconnect();

      if (!results) {
        return Left.error(new PricingNotExistsError(`Admin with id: ${adminId} not has pricing registered`))
      }

      return Right.success(results.map((result) => this.mapper.toDomain(result)));
    } catch (error: any) {
      this.prisma.$disconnect();
      return Left.error(error);
    }
  }

}