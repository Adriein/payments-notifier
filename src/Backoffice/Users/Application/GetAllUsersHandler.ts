import { IHandler } from "../../../Shared/Domain/Interfaces/IHandler";
import { GetAllUsersQuery } from "../Domain/Query/GetAllUsersQuery";
import { QueryHandler } from "../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { IUserRepository } from "../Domain/IUserRepository";
import { IQueryBus } from "../../../Shared/Domain/Bus/IQueryBus";
import { PricingResponseDto } from "../../Pricing/Application/PricingResponse.dto";
import { GetUserResponseDto } from "./GetUserResponseDto";
import { GetPricingQuery } from "../../Pricing/Domain/GetPricingQuery";
import { Log } from "../../../Shared/Domain/Decorators/Log";

@QueryHandler(GetAllUsersQuery)
export class GetAllUsersHandler implements IHandler<GetUserResponseDto[]> {
  public constructor(
    private readonly repository: IUserRepository,
    private readonly bus: IQueryBus<PricingResponseDto>
  ) {
  }

  @Log(process.env.LOG_LEVEL)
  public async handle(query: GetAllUsersQuery): Promise<GetUserResponseDto[]> {
    const users = await this.repository.findAllUsersByAdminWithActiveSubscriptions(query.adminId);
    const responses: GetUserResponseDto[] = [];

    for (const user of users) {
      const pricing = await this.bus.ask(new GetPricingQuery(user.pricingId()));

      responses.push(new GetUserResponseDto(user, pricing));
    }

    return responses;
  }
}