import { Log } from '../../../../Shared/Domain/Decorators/Log';
import { ID } from '../../../../Shared/Domain/VO/Id.vo';
import { GetUserQuery } from '../../Domain/Query/GetUserQuery';
import { QueryHandler } from "../../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { IQueryBus } from "../../../../Shared/Domain/Bus/IQueryBus";
import { PricingResponse } from "../../../Pricing/Application/Find/PricingResponse";
import { GetPricingQuery } from "../../../Pricing/Domain/Query/GetPricingQuery";
import { IUserRepository } from "../../Domain/IUserRepository";
import { GetUserResponse } from "./GetUserResponse";
import { UserResponseBuilder } from "../Service/UserResponseBuilder";
import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";

@QueryHandler(GetUserQuery)
export class GetUserProfileHandler implements IHandler<GetUserResponse> {
  constructor(private readonly repository: IUserRepository, private readonly bus: IQueryBus) {
  }

  @Log(process.env.LOG_LEVEL)
  public async handle(command: GetUserQuery): Promise<GetUserResponse> {
    const presenter = new UserResponseBuilder();
    const userId = new ID(command.userId);

    const result = await this.repository.findOne(userId.value);

    if (result.isLeft()) {
      throw result.value;
    }

    const user = result.value;

    const pricing = await this.bus.ask(new GetPricingQuery(user));

    return presenter.run(user, pricing);
  }

  private buildResponse(): any {

  }
}
