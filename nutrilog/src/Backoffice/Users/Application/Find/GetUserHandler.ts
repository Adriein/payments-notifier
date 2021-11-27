import { Log } from '../../../../Shared/Domain/Decorators/Log';
import { IHandler } from '../../../../Domain/Interfaces';
import { ID } from '../../../../Shared/Domain/VO/Id.vo';
import { GetUserQuery } from '../../Domain/Query/GetUserQuery';
import { QueryHandler } from "../../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { UserNotExistError } from "../../Domain/UserNotExistError";
import { GetUserResponseDto } from "./GetUserResponseDto";
import { IQueryBus } from "../../../../Shared/Domain/Bus/IQueryBus";
import { PricingResponse } from "../../../Pricing/Application/PricingResponse";
import { GetPricingQuery } from "../../../Pricing/Domain/GetPricingQuery";
import { IUserRepository } from "../../Domain/IUserRepository";

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IHandler<GetUserResponseDto> {
  constructor(private readonly repository: IUserRepository, private readonly bus: IQueryBus<PricingResponse>) {
  }

  @Log(process.env.LOG_LEVEL)
  public async handle(command: GetUserQuery): Promise<GetUserResponseDto> {
    const userId = new ID(command.userId);

    const user = await this.repository.findOne(userId.value);

    if (!user) {
      throw new UserNotExistError(command.userId);
    }

    const pricing = await this.bus.ask(new GetPricingQuery(user.pricingId()));

    return new GetUserResponseDto(user, pricing);
  }
}
