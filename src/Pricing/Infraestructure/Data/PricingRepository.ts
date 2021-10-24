import { IPricingRepository } from "../../Domain/IPricingRepository";
import { Pricing } from "../../Domain/Pricing.entity";
import { Criteria } from "../../../Shared/Domain/Entities/Criteria";
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

  findOne(id: string): Promise<Pricing | undefined> {
    return Promise.resolve(undefined);
  }

  save(entity: Pricing): Promise<void> {
    return Promise.resolve(undefined);
  }

  update(entity: Pricing): Promise<void> {
    return Promise.resolve(undefined);
  }

}