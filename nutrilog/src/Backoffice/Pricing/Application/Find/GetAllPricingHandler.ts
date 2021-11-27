import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { PricingResponse } from "./PricingResponse";
import { GetAllPricingQuery } from "../../Domain/Query/GetAllPricingQuery";
import { QueryHandler } from "../../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { IPricingRepository } from "../../Domain/IPricingRepository";
import { Pricing } from "../../Domain/Pricing.entity";
import { Log } from "../../../../Shared/Domain/Decorators/Log";

@QueryHandler(GetAllPricingQuery)
export class GetAllPricingHandler implements IHandler<PricingResponse[]> {
  constructor(public readonly repository: IPricingRepository) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(query: GetAllPricingQuery): Promise<PricingResponse[]> {
    const pricingByAdmin = await this.repository.findAll(query.adminId);

    return pricingByAdmin.map((pricing: Pricing) => new PricingResponse(
      pricing.id(),
      pricing.name(),
      pricing.duration(),
      pricing.price()
    ));
  }

}