import { IPricingRepository } from "../../Domain/IPricingRepository";
import { Pricing } from "../../Domain/Pricing.entity";
import { Criteria } from "../../../../Shared/Domain/Entities/Criteria";
import { PricingDao } from "./Pricing.dao";
import { PricingMapper } from "./PricingMapper";

export class PricingRepository implements IPricingRepository {
  private readonly mapper = new PricingMapper();

  delete(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async find(criteria: Criteria): Promise<Pricing[]> {
    const dao = new PricingDao();

    const results = await dao.find(criteria);

    return results.map(result => this.mapper.toDomain(result));
  }

  public async findOne(id: string): Promise<Pricing | undefined> {
    const dao = new PricingDao();
    dao.id = id;

    const pricingDAO = await dao.getOne();

    if (!pricingDAO) {
      return undefined;
    }

    return this.mapper.toDomain(pricingDAO);
  }

  save(entity: Pricing): Promise<void> {
    return Promise.resolve(undefined);
  }

  update(entity: Pricing): Promise<void> {
    return Promise.resolve(undefined);
  }

}