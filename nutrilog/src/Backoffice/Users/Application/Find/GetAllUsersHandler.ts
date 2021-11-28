import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { GetAllUsersQuery } from "../../Domain/Query/GetAllUsersQuery";
import { QueryHandler } from "../../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { Log } from "../../../../Shared/Domain/Decorators/Log";
import { FilterRequestDto } from "./FilterRequestDto";
import { GetUserResponse } from "./GetUserResponse";
import { IUserRepository } from "../../Domain/IUserRepository";
import { GetUserPresenter } from "./GetUserPresenter";
import { IQueryBus } from "../../../../Shared/Domain/Bus/IQueryBus";
import { PricingResponse } from "../../../Pricing/Application/Find/PricingResponse";
import { GetPricingQuery } from "../../../Pricing/Domain/Query/GetPricingQuery";

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements IHandler<GetUserResponse[]> {
  public constructor(private readonly repository: IUserRepository, private queryBus: IQueryBus<PricingResponse>) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(query: GetAllUsersQuery): Promise<GetUserResponse[]> {
    const presenter = new GetUserPresenter();
    const responses: GetUserResponse[] = [];

    if (this.hasFilters(query.filters)) {
      const users = await this.repository.find();

      for (const user of users) {
        const pricing = await this.queryBus.ask(new GetPricingQuery(user.pricingId()));
        const userResponse = presenter.execute(user, pricing);

        responses.push(userResponse);
      }

      return responses;
    }

    const users = await this.repository.findUsersWithActiveSubscriptions(query.adminId);

    for (const user of users) {
      const pricing = await this.queryBus.ask(new GetPricingQuery(user.pricingId()));
      const userResponse = presenter.execute(user, pricing);

      responses.push(userResponse);
    }

    return responses;
  }

  private hasFilters(filters: FilterRequestDto[]): boolean {
    return filters.length > 0;
  }
}