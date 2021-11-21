import { IHandler } from "../../../Shared/Domain/Interfaces/IHandler";
import { PricingResponseDto } from "./PricingResponse.dto";
import { GetAllPricingQuery } from "../Domain/GetAllPricingQuery";
import { QueryHandler } from "../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { IPricingRepository } from "../Domain/IPricingRepository";
import { Pricing } from "../Domain/Pricing.entity";

@QueryHandler(GetAllPricingQuery)
export class GetAllPricingHandler implements IHandler<PricingResponseDto[]> {
  constructor(public readonly repository: IPricingRepository) {}

  public async handle(query: GetAllPricingQuery): Promise<PricingResponseDto[]> {
    const pricingByAdmin = await this.repository.findAll(query.adminId);

    return pricingByAdmin.map((pricing: Pricing) => new PricingResponseDto(
      pricing.id(),
      pricing.name(),
      pricing.duration(),
      pricing.price()
    ));
  }

}