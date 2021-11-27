import { QueryHandler } from "../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { IHandler } from "../../../Shared/Domain/Interfaces/IHandler";
import { GetPricingQuery } from "../Domain/GetPricingQuery";
import { PricingResponse } from "./PricingResponse";
import { IPricingRepository } from "../Domain/IPricingRepository";
import { ID } from "../../../Shared/Domain/VO/Id.vo";
import { PricingNotExistsError } from "../Domain/PricingNotExistsError";

@QueryHandler(GetPricingQuery)
export class GetPricingHandler implements IHandler<PricingResponse> {
  public constructor(private repository: IPricingRepository) {
  }

  public async handle(query: GetPricingQuery): Promise<PricingResponse> {
    const id = new ID(query.id);

    const pricing = await this.repository.findOne(id.value);

    if (!pricing) {
      throw new PricingNotExistsError(id.value);
    }

    return new PricingResponse(pricing.id(), pricing.name(), pricing.duration(), pricing.price());
  }

}