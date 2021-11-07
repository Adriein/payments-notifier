import { IPricingRepository } from "../../Domain/IPricingRepository";
import { Pricing } from "../../Domain/Pricing.entity";
import { Criteria } from "../../../../Shared/Domain/Entities/Criteria";
import { PricingMapper } from "./PricingMapper";
import { PrismaClient } from "@prisma/client";

export class PricingRepository implements IPricingRepository {
  private readonly mapper = new PricingMapper();

  delete(id: string): Promise<void> {
    throw new Error('Not implemented yet');
  }

  public async find(criteria: Criteria): Promise<Pricing[]> {
    throw new Error('Not implemented yet');
  }

  public async findOne(id: string): Promise<Pricing | undefined> {
    const prisma = new PrismaClient();

    const result = await prisma.pricing.findUnique({
      where: {
        id
      }
    });

    prisma.$disconnect();

    if (!result) {
      return undefined;
    }

    return this.mapper.toDomain(result);
  }

  save(entity: Pricing): Promise<void> {
    throw new Error('Not implemented yet');
  }

  update(entity: Pricing): Promise<void> {
    throw new Error('Not implemented yet');
  }

  public async search(pricingName: string): Promise<Pricing | undefined> {
    const prisma = new PrismaClient();

    const [ result ] = await prisma.pricing.findMany({
      where: {
        pricing_name: pricingName
      }
    });

    prisma.$disconnect();

    if (!result) {
      return undefined;
    }

    return this.mapper.toDomain(result);
  }

}