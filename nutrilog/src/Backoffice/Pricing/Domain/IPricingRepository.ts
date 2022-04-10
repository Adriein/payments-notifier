import { IRepository } from "../../../Shared/Domain/Interfaces/IRepository";
import { Pricing } from "./Pricing.entity";
import { Either } from "../../../Shared/Domain/types";
import { PricingNotExistsError } from "./PricingNotExistsError";


export interface IPricingRepository extends IRepository<Pricing> {
  search(pricingName: string): Promise<Either<Error, Pricing[]>>;

  findAll(adminId: string): Promise<Either<Error | PricingNotExistsError, Pricing[]>>;

  findDistinctValues(tenantId: string, value: string): Promise<Either<Error, Pricing[]>>
}
