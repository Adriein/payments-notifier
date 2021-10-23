import { QueryHandler } from "../../Shared/Domain/Decorators/QueryHandler.decorator";
import { IHandler } from "../../Shared/Domain/Interfaces/IHandler";
import { GetPricingQuery } from "../Domain/GetPricingQuery";

@QueryHandler(GetPricingQuery)
export class GetPricingHandler implements IHandler<any> {
  handle(query: GetPricingQuery): Promise<any> {
    return Promise.resolve(undefined);
  }

}