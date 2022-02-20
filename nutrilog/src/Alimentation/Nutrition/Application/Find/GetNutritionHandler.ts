import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { GetNutritionResponse } from "./GetNutritionResponse";
import { GetNutritionQuery } from "../../Domain/Query/GetNutritionQuery";
import { INutritionRepository } from "../../Domain/INutritionRepository";
import { NutritionResponseBuilder } from "../Services/NutritionResponseBuilder";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { IQueryBus } from "../../../../Shared/Domain/Bus/IQueryBus";
import { FindTenantClientsResponse } from "../../../../Backoffice/User/Application/FindTenantClients/FindTenantClientsResponse";
import { GetUserProfileQuery } from "../../../../Backoffice/User/Application/GetUserProfile/GetUserProfileQuery";
import { QueryHandler } from "../../../../Shared/Domain/Decorators/QueryHandler.decorator";

@QueryHandler(GetNutritionQuery)
export class GetNutritionHandler implements IHandler<GetNutritionResponse> {
  constructor(
    private readonly repository: INutritionRepository,
    private readonly queryBus: IQueryBus<FindTenantClientsResponse>,
    private readonly builder: NutritionResponseBuilder
  ) {}

  public async handle(query: GetNutritionQuery): Promise<GetNutritionResponse> {
    const nutritionId = new ID(query.nutritionId);
    const result = await this.repository.findOne(nutritionId.value);

    if (result.isLeft()) {
      throw result.value;
    }
    const nutrition = result.value;

    const user = await this.queryBus.ask(new GetUserProfileQuery(nutrition.userId()))

    return this.builder.run(nutrition, user);
  }
}