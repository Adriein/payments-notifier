import { QueryHandler } from "../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { FindPricingQuery } from "../Domain/FindPricingQuery";
import { IHandler } from "../../../Shared/Domain/Interfaces/IHandler";
import { IPricingRepository } from "../Domain/IPricingRepository";
import { PricingResponseDto } from "./PricingResponse.dto";

@QueryHandler(FindPricingQuery)
export class FindPricingHandler implements IHandler<PricingResponseDto> {
  constructor(private readonly repository: IPricingRepository) {
  }

  public async handle(query: FindPricingQuery): Promise<PricingResponseDto> {
    const [ pricing ] = await this.repository.find(query.criteria);

    return new PricingResponseDto(pricing.id(), pricing.name(), pricing.duration(), pricing.price());
  }
}