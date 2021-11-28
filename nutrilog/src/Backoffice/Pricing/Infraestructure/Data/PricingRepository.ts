import { IPricingRepository } from "../../Domain/IPricingRepository";
import { Pricing } from "../../Domain/Pricing.entity";
import { Criteria } from "../../../../Shared/Domain/Entities/Criteria";
import { PricingMapper } from "./PricingMapper";
import Database from "../../../../Shared/Infrastructure/Data/Database";
import { Log } from "../../../../Shared/Domain/Decorators/Log";

export class PricingRepository implements IPricingRepository {
  private readonly mapper = new PricingMapper();
  private prisma = Database.instance().connection();

  delete(entity: Pricing): Promise<void> {
    throw new Error('Not implemented yet');
  }

  public async find(criteria: Criteria): Promise<Pricing[]> {
    throw new Error('Not implemented yet');
  }

  @Log(process.env.LOG_LEVEL)
  public async findOne(id: string): Promise<Pricing | undefined> {
    const result = await this.prisma.pricing.findUnique({
      where: {
        id
      }
    });

    this.prisma.$disconnect();

    if (!result) {
      return undefined;
    }

    return this.mapper.toDomain(result);
  }

  @Log(process.env.LOG_LEVEL)
  public async save(entity: Pricing): Promise<void> {
    const data = this.mapper.toSaveDataModel(entity);

    await this.prisma.pricing.create({ data });
  }

  update(entity: Pricing): Promise<void> {
    throw new Error('Not implemented yet');
  }

  @Log(process.env.LOG_LEVEL)
  public async search(pricingName: string): Promise<Pricing | undefined> {
    const [ result ] = await this.prisma.pricing.findMany({
      where: {
        pricing_name: pricingName
      }
    });

    this.prisma.$disconnect();

    if (!result) {
      return undefined;
    }

    return this.mapper.toDomain(result);
  }

  @Log(process.env.LOG_LEVEL)
  public async findAll(adminId: string): Promise<Pricing[]> {
    try {
      const results = await this.prisma.pricing.findMany({
        where: {
          user_id: adminId
        }
      });

      this.prisma.$disconnect();

      if (!results) {
        return [];
      }

      return results.map((result) => this.mapper.toDomain(result));
    } catch (error) {
      this.prisma.$disconnect();
      return [];
    }
  }

}