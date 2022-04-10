import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { GetPricingDistinctValuesResponseDto } from "./GetPricingDistinctValuesResponseDto";
import { QueryHandler } from "../../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { GetPricingDistinctValuesQuery } from "./GetPricingDistinctValuesQuery";
import { IPricingRepository } from "../../Domain/IPricingRepository";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { Log } from "../../../../Shared/Domain/Decorators/Log";

@QueryHandler(GetPricingDistinctValuesQuery)
export class GetPricingDistinctValuesHandler implements IHandler<GetPricingDistinctValuesResponseDto[]> {
  constructor(private readonly repository: IPricingRepository) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(query: GetPricingDistinctValuesQuery): Promise<GetPricingDistinctValuesResponseDto[]> {
    const tenantId = new ID(query.tenantId);
    const response: GetPricingDistinctValuesResponseDto[] = [];

    for (const value of query.values) {
      const dto: { field: string, values: any[] } = { field: value, values: [] };
      const result = await this.repository.findDistinctValues(tenantId.value, value);

      if (result.isLeft()) {
        throw result;
      }


      for (const pricing of result.value) {
        if (value === 'pricing_name') {
          dto.values.push(pricing.name());
        }

        if (value === 'duration') {
          dto.values.push(pricing.duration());
        }

        if (value === 'amount') {
          dto.values.push(pricing.price());
        }

      }

      response.push(dto);
    }


    return response;
  }

}