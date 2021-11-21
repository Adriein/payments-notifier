import { IRepository } from "../../../Shared/Domain/Interfaces/IRepository";
import { Pricing } from "./Pricing.entity";


export interface IPricingRepository extends IRepository<Pricing> {
  search(pricingName: string): Promise<Pricing | undefined>;

  findAll(adminId: string): Promise<Pricing[]>;
}