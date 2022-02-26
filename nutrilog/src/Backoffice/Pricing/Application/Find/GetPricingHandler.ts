import { QueryHandler } from "../../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { GetPricingQuery } from "../../Domain/Query/GetPricingQuery";
import { PricingResponse } from "./PricingResponse";
import { IPricingRepository } from "../../Domain/IPricingRepository";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { PricingNotExistsError } from "../../Domain/PricingNotExistsError";
import { Log } from "../../../../Shared/Domain/Decorators/Log";

@QueryHandler(GetPricingQuery)
export class GetPricingHandler implements IHandler<PricingResponse> {
  public constructor(private repository: IPricingRepository) {
  }

  @Log(process.env.LOG_LEVEL)
  public async handle(query: GetPricingQuery): Promise<PricingResponse> {
    const id = new ID(query.id);

    const result = await this.repository.findOne(id.value);

    if (result.isLeft()) {
      throw result.value;
    }

    const pricing = result.value;

    return new PricingResponse(pricing.id().value, pricing.name(), pricing.duration(), pricing.price());
  }

}