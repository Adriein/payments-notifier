import { QueryHandler } from "../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { IHandler } from "../../../Shared/Domain/Interfaces/IHandler";
import { GetPricingQuery } from "../Domain/GetPricingQuery";
import { PricingResponseDto } from "./PricingResponse.dto";
import { IPricingRepository } from "../Domain/IPricingRepository";
import { ID } from "../../../Shared/Domain/VO/Id.vo";

@QueryHandler(GetPricingQuery)
export class GetPricingHandler implements IHandler<PricingResponseDto> {
  public constructor(private repository: IPricingRepository) {
  }

  public async handle(query: GetPricingQuery): Promise<PricingResponseDto> {
    const id = new ID(query.id);

    const pricing = await this.repository.findOne(id.value);

    if (!pricing) {
      throw new Error();
    }

    return new PricingResponseDto(pricing.id(), pricing.name(), pricing.duration(), pricing.price());
  }

}