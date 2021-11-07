import { IHandler } from "../../../Shared/Domain/Interfaces/IHandler";
import { PricingResponseDto } from "./PricingResponse.dto";
import { SearchPricingQuery } from "../Domain/SearchPricingQuery";
import { IPricingRepository } from "../Domain/IPricingRepository";
import { PricingNotExistsError } from "../Domain/PricingNotExistsError";
import { QueryHandler } from "../../../Shared/Domain/Decorators/QueryHandler.decorator";

@QueryHandler(SearchPricingQuery)
export class SearchPricingHandler implements IHandler<PricingResponseDto> {
  constructor(private readonly repository: IPricingRepository) {
  }

  public async handle(query: SearchPricingQuery): Promise<PricingResponseDto> {
    const pricing = await this.repository.search(query.pricingName);

    if (!pricing) {
      throw new PricingNotExistsError(query.pricingName);
    }

    return new PricingResponseDto(pricing.id(), pricing.name(), pricing.duration(), pricing.price());
  }

}