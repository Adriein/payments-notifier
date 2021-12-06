import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { IQueryBus } from "../../../../Shared/Domain/Bus/IQueryBus";
import { GetUserResponse } from "./GetUserResponse";
import { FindUsersWithoutNutritionQuery } from "../../Domain/Query/FindUsersWithoutNutritionQuery";
import { IUserRepository } from "../../Domain/IUserRepository";
import { GetNutritionResponse } from "../../../../Alimentation/Nutrition/Application/Find/GetNutritionResponse";
import { FindNutritionQuery } from "../../../../Alimentation/Nutrition/Domain/Query/FindNutritionQuery";
import { UserResponseBuilder } from "../Service/UserResponseBuilder";
import { PricingResponse } from "../../../Pricing/Application/Find/PricingResponse";
import { GetPricingQuery } from "../../../Pricing/Domain/Query/GetPricingQuery";
import { UserNotExistError } from "../../Domain/UserNotExistError";
import { UserWithoutNutritionSpecification } from "../../Domain/Specifications/UserWithoutNutritionSpecification";

export class FindUsersWithoutNutritionHandler implements IHandler<GetUserResponse[]> {
  constructor(
    private readonly repository: IUserRepository,
    private queryBus: IQueryBus<GetNutritionResponse[]>,
    private pricingQueryBus: IQueryBus<PricingResponse>,
    private readonly builder: UserResponseBuilder
  ) {}

  public async handle(query: FindUsersWithoutNutritionQuery): Promise<GetUserResponse[]> {
    const result = await this.repository.find(query.adminId);
    const response: GetUserResponse[] = [];

    if (result.isLeft()) {
      if (result.value instanceof UserNotExistError) {
        return response;
      }
      throw result.value;
    }

    const nutritionList = await this.queryBus.ask(new FindNutritionQuery(query.adminId));
    const listOfUserIdsWithNutrition = nutritionList.map((response: GetNutritionResponse) => response.user.id);

    const spec = new UserWithoutNutritionSpecification(listOfUserIdsWithNutrition);

    for (const user of result.value) {
      if (spec.IsSatisfiedBy(user)) {
        const pricing = await this.pricingQueryBus.ask(new GetPricingQuery(user.pricingId()));
        response.push(this.builder.run(user, pricing))
      }
    }

    return response;
  }
}