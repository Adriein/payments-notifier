import { IPricingRepository } from "../../Domain/IPricingRepository";
import { Pricing } from "../../Domain/Pricing.entity";
import { Criteria } from "../../../Shared/Domain/Entities/Criteria";

export class PricingRepository implements IPricingRepository {
  delete(id: string): Promise<void> {
    return Promise.resolve(undefined);
  }

  find(criteria: Criteria): Promise<Pricing[]> {
    return Promise.resolve([]);
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