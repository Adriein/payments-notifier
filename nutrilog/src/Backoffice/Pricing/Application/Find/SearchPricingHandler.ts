import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { PricingResponse } from "./PricingResponse";
import { SearchPricingQuery } from "../../Domain/Query/SearchPricingQuery";
import { IPricingRepository } from "../../Domain/IPricingRepository";
import { QueryHandler } from "../../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { Log } from "../../../../Shared/Domain/Decorators/Log";

@QueryHandler(SearchPricingQuery)
export class SearchPricingHandler implements IHandler<PricingResponse> {
  constructor(private readonly repository: IPricingRepository) {
  }

  @Log(process.env.LOG_LEVEL)
  public async handle(query: SearchPricingQuery): Promise<PricingResponse> {
    const result = await this.repository.search(query.pricingName);

    if (result.isLeft()) {
      throw result.value;
    }

    const [ pricing ] = result.value;

    return new PricingResponse(pricing.id().value, pricing.name(), pricing.duration(), pricing.price());
  }

}