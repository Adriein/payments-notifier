import { QueryHandler } from "../../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { FindFiltersQuery } from "./FindFiltersQuery";
import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { NutrilogResponse } from "../../../../Shared/Application/NutrilogResponse";
import { FindFiltersResponseDto } from "./FindFiltersResponseDto";
import { IAppFilterRepository } from "../../Domain/IAppFilterRepository";
import { AppFilter } from "../../Domain/Entity/AppFilter.entity";
import { Criteria } from "../../../../Shared/Domain/Entities/Criteria";
import { AppFilterFilter } from "../../Domain/Filter/AppFilterFilter";
import { Log } from "../../../../Shared/Domain/Decorators/Log";
import { GetPricingDistinctValuesQuery } from "../../../Pricing/Application/GetPricingDistinctValues/GetPricingDistinctValuesQuery";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { AppFilterCollection } from "../../Domain/Entity/AppFilterCollection";
import { GetPricingDistinctValuesResponseDto } from "../../../Pricing/Application/GetPricingDistinctValues/GetPricingDistinctValuesResponseDto";
import { AppFilterField } from "../../Domain/Entity/AppFilterField";
import { IQueryBus } from "../../../../Shared/Domain/Bus/IQueryBus";

@QueryHandler(FindFiltersQuery)
export class FindFiltersHandler implements IHandler<NutrilogResponse<FindFiltersResponseDto[]>> {
  private readonly ENTITIES = [ 'user', 'subscription', 'config', 'pricing' ];
  private readonly OPERATIONS = [ 'equal', 'not_equal' ];
  private readonly PRICING_ENTITY = 'pricing';
  private readonly CONFIG_ENTITY = 'config';

  constructor(private readonly repository: IAppFilterRepository, private readonly queryBus: IQueryBus) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(query: FindFiltersQuery): Promise<NutrilogResponse<FindFiltersResponseDto[]>> {
    const tenantId = new ID(query.tenantId);

    const appFilterList = await this.findEntityFilters(tenantId);

    const collection = await this.fillEntityDistinctValues(tenantId, appFilterList);

    const response = this.responseBuilder(collection);

    return new NutrilogResponse<FindFiltersResponseDto[]>(response);
  }

  private async findEntityFilters(tenantId: ID): Promise<AppFilterCollection> {
    const criteria = new Criteria<AppFilterFilter>();

    criteria.equal('tenantId', tenantId)
    criteria.in('entity', this.ENTITIES);

    const response = await this.repository.find(criteria);

    if (response.isLeft()) {
      throw response;
    }

    return new AppFilterCollection(response.value);
  }

  private async fillEntityDistinctValues(
    tenantId: ID,
    collection: AppFilterCollection
  ): Promise<AppFilterCollection> {

    for (const filter of collection.data()) {
      if (filter.entity() === this.PRICING_ENTITY) {
        const response = await this.queryBus.ask<GetPricingDistinctValuesResponseDto[]>(
          new GetPricingDistinctValuesQuery(
            tenantId.value,
            filter.fieldNames()
          )
        );

        for (const item of response) {
          filter.addFieldValues(item.field, item.values);
        }
      }

      if (filter.entity() === this.CONFIG_ENTITY) {
        filter.addFieldValues('language', [ 'ES', 'EN' ]);
      }

      filter.fillBooleanFieldValues();
    }

    return collection;
  }

  private responseBuilder(collection: AppFilterCollection): FindFiltersResponseDto[] {
    const result: FindFiltersResponseDto[] = [];

    for (const appFilter of collection.data()) {
      const response: FindFiltersResponseDto = {
        entity: appFilter.entity(),
        operations: this.OPERATIONS,
        fields: this.buildResponseFields(appFilter)
      }

      result.push(response);
    }

    return result;
  }

  private buildResponseFields(appFilter: AppFilter): Record<string, string[]> {
    return appFilter.fields().reduce((response: Record<string, string[]>, field: AppFilterField) => {
      return {
        ...response,
        [field.name()]: field.values()
      }
    }, {})
  }
}