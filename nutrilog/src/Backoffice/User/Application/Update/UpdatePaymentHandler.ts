import { Log } from "../../../../Shared/Domain/Decorators/Log";
import { CommandHandler } from "../../../../Shared/Domain/Decorators/CommandHandler.decorator";
import { IUserRepository } from "../../Domain/IUserRepository";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { DateVo } from "../../../../Shared/Domain/VO/Date.vo";
import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { UpdatePaymentCommand } from "../../Domain/Command/UpdatePaymentCommand";
import { User } from "../../Domain/Entity/User.entity";
import { IQueryBus } from "../../../../Shared/Domain/Bus/IQueryBus";
import { PricingResponse } from "../../../Pricing/Application/Find/PricingResponse";
import { GetPricingQuery } from "../../../Pricing/Domain/Query/GetPricingQuery";

@CommandHandler(UpdatePaymentCommand)
export class UpdatePaymentHandler implements IHandler<void> {
  constructor(private repository: IUserRepository, private queryBus: IQueryBus) {
  }

  @Log(process.env.LOG_LEVEL)
  public async handle(command: UpdatePaymentCommand): Promise<void> {

  }


  private async getUser(id: ID): Promise<User> {
    const result = await this.repository.findOne(id.value);

    if (result.isLeft()) {
      throw result.value;
    }

    return result.value;
  }
}