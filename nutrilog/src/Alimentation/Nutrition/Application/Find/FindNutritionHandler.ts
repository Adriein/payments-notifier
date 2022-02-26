import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { QueryHandler } from "../../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { FindNutritionQuery } from "../../Domain/Query/FindNutritionQuery";
import { INutritionRepository } from "../../Domain/INutritionRepository";
import { IQueryBus } from "../../../../Shared/Domain/Bus/IQueryBus";
import { FindTenantClientsResponse } from "../../../../Backoffice/User/Application/FindTenantClients/FindTenantClientsResponse";
import { NutritionResponseBuilder } from "../Services/NutritionResponseBuilder";
import { GetNutritionResponse } from "./GetNutritionResponse";
import { GetClientProfileQuery } from "../../../../Backoffice/User/Application/GetClientProfile/GetClientProfileQuery";
import { NutritionNotExistsError } from "../../Domain/NutritionNotExistsError";
import { Criteria } from "../../../../Shared/Domain/Entities/Criteria";
import { GetClientProfileResponse } from "../../../../Backoffice/User/Application/GetClientProfile/GetClientProfileResponse";

@QueryHandler(FindNutritionQuery)
export class FindNutritionHandler implements IHandler<GetNutritionResponse[]> {
  constructor(
    private readonly repository: INutritionRepository,
    private readonly queryBus: IQueryBus,
    private readonly builder: NutritionResponseBuilder
  ) {}

  public async handle(query: FindNutritionQuery): Promise<GetNutritionResponse[]> {
    const response: GetNutritionResponse[] = [];

    const result = await this.repository.find(new Criteria<any>());

    if (result.isLeft()) {
      if (result.value instanceof NutritionNotExistsError) {
        return response;
      }

      throw result.value;
    }

    for (const nutrition of result.value) {
      const user = await this.queryBus.ask<GetClientProfileResponse>(new GetClientProfileQuery(nutrition.userId()));

      response.push(this.builder.run(nutrition, user));
    }

    return response;
  }
}