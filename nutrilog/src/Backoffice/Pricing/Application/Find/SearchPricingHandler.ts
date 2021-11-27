import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { PricingResponse } from "./PricingResponse";
import { SearchPricingQuery } from "../../Domain/Query/SearchPricingQuery";
import { IPricingRepository } from "../../Domain/IPricingRepository";
import { PricingNotExistsError } from "../../Domain/PricingNotExistsError";
import { QueryHandler } from "../../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { Log } from "../../../../Shared/Domain/Decorators/Log";

@QueryHandler(SearchPricingQuery)
export class SearchPricingHandler implements IHandler<PricingResponse> {
  constructor(private readonly repository: IPricingRepository) {
  }

  @Log(process.env.LOG_LEVEL)
  public async handle(query: SearchPricingQuery): Promise<PricingResponse> {
    const pricing = await this.repository.search(query.pricingName);

    if (!pricing) {
      throw new PricingNotExistsError(query.pricingName);
    }

    return new PricingResponse(pricing.id(), pricing.name(), pricing.duration(), pricing.price());
  }

}