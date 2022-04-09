import { QueryHandler } from "../../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { FindFiltersQuery } from "./FindFiltersQuery";
import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { NutrilogResponse } from "../../../../Shared/Application/NutrilogResponse";
import { FindFiltersResponseDto } from "./FindFiltersResponseDto";
import { IAppFilterRepository } from "../../Domain/IAppFilterRepository";
import { AppFilter } from "../../Domain/Entity/AppFilter.entity";
import { Criteria } from "../../../../Shared/Domain/Entities/Criteria";
import { AppFilterFilter } from "../../Domain/Filter/AppFilterFilter";

@QueryHandler(FindFiltersQuery)
export class FindFiltersHandler implements IHandler<NutrilogResponse<FindFiltersResponseDto[]>> {
  private readonly ENTITIES = [ 'user', 'subscription', 'config', 'pricing' ];

  constructor(private readonly repository: IAppFilterRepository) {}

  public async handle(query: FindFiltersQuery): Promise<NutrilogResponse<FindFiltersResponseDto[]>> {
    const appFilterList = await this.findEntityFilters(this.ENTITIES);

    const response = this.responseBuilder(appFilterList);

    return new NutrilogResponse<FindFiltersResponseDto[]>(response);
  }

  private async findEntityFilters(entities: string[]): Promise<AppFilter[]> {
    const criteria = new Criteria<AppFilterFilter>();

    for (const entity of entities) {
      criteria.equal('entity', entity);
    }

    const response = await this.repository.find(criteria);

    if (response.isLeft()) {
      throw response;
    }

    return response.value;
  }

  private responseBuilder(appFilterList: AppFilter[]): FindFiltersResponseDto[] {
    for (const appFilter of appFilterList) {

    }

    return [];
  }
}