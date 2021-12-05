import { Log } from '../../../../Shared/Domain/Decorators/Log';
import { ID } from '../../../../Shared/Domain/VO/Id.vo';
import { GetUserQuery } from '../../Domain/Query/GetUserQuery';
import { QueryHandler } from "../../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { UserNotExistError } from "../../Domain/UserNotExistError";
import { IQueryBus } from "../../../../Shared/Domain/Bus/IQueryBus";
import { PricingResponse } from "../../../Pricing/Application/Find/PricingResponse";
import { GetPricingQuery } from "../../../Pricing/Domain/Query/GetPricingQuery";
import { IUserRepository } from "../../Domain/IUserRepository";
import { GetUserResponse } from "./GetUserResponse";
import { UserResponseBuilder } from "../Service/UserResponseBuilder";
import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IHandler<GetUserResponse> {
  constructor(private readonly repository: IUserRepository, private readonly bus: IQueryBus<PricingResponse>) {
  }

  @Log(process.env.LOG_LEVEL)
  public async handle(command: GetUserQuery): Promise<GetUserResponse> {
    const presenter = new UserResponseBuilder();
    const userId = new ID(command.userId);

    const user = await this.repository.findOne(userId.value);

    if (!user) {
      throw new UserNotExistError(`User with id: ${userId.value} not exists`);
    }

    const pricing = await this.bus.ask(new GetPricingQuery(user.pricingId()));

    return presenter.run(user, pricing);
  }
}
