import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { QueryHandler } from "../../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { FindNutritionQuery } from "../../Domain/Query/FindNutritionQuery";
import { INutritionRepository } from "../../Domain/INutritionRepository";
import { IQueryBus } from "../../../../Shared/Domain/Bus/IQueryBus";
import { GetUserResponse } from "../../../../Backoffice/Users/Application/Find/GetUserResponse";
import { NutritionResponseBuilder } from "../Services/NutritionResponseBuilder";
import { GetNutritionResponse } from "./GetNutritionResponse";
import { GetUserQuery } from "../../../../Backoffice/Users/Domain/Query/GetUserQuery";
import { NutritionNotExistsError } from "../../Domain/NutritionNotExistsError";
import { Criteria } from "../../../../Shared/Domain/Entities/Criteria";

@QueryHandler(FindNutritionQuery)
export class FindNutritionHandler implements IHandler<GetNutritionResponse[]> {
  constructor(
    private readonly repository: INutritionRepository,
    private readonly queryBus: IQueryBus<GetUserResponse>,
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
      const user = await this.queryBus.ask(new GetUserQuery(nutrition.userId()));

      response.push(this.builder.run(nutrition, user));
    }

    return response;
  }
}