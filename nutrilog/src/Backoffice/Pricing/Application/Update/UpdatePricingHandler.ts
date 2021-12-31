import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { Log } from "../../../../Shared/Domain/Decorators/Log";
import { CommandHandler } from "../../../../Shared/Domain/Decorators/CommandHandler.decorator";
import { IPricingRepository } from "../../Domain/IPricingRepository";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { Pricing } from "../../Domain/Pricing.entity";
import { PricingAlreadyExistsError } from "../../Domain/PricingAlreadyExistsError";
import { UpdatePricingCommand } from "../../Domain/Command/UpdatePricingCommand";

@CommandHandler(UpdatePricingCommand)
export class UpdatePricingHandler implements IHandler<void> {

  constructor(private readonly repository: IPricingRepository) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(command: UpdatePricingCommand): Promise<void> {
    const { name, duration, amount } = command;

    const id = new ID(command.id);
    const adminId = new ID(command.adminId);


    const pricingInDb = await this.repository.findOne(id.value);

    if (pricingInDb) {
      throw new PricingAlreadyExistsError(name);
    }

    const pricing = Pricing.build(name, duration, amount, adminId);

    await this.repository.save(pricing);
  }
}