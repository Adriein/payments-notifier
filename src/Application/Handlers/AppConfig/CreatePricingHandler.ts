import { CreatePricingCommand } from '../../../Domain/Commands/AppConfig/CreatePricingCommand';
import { Log } from '../../../Shared/Domain/Decorators/Log';
import { AppConfig } from '../../../Domain/Entities/AppConfig.entity';
import { IHandler } from '../../../Domain/Interfaces';
import { IConfigRepository } from '../../../Domain/Interfaces/IConfigRepository';
import { Pricing } from '../../../Domain/VO/Pricing.vo';
import { ICommand } from "../../../Shared/Domain/Interfaces/ICommand";

export class CreatePricingHandler implements IHandler<void> {
  constructor(private appConfigRepository: IConfigRepository) {
  }

  @Log(process.env.LOG_LEVEL)
  async handle(command: ICommand): Promise<void> {
    const { name, duration, price, adminId } = command as CreatePricingCommand;

    const appConfigOnDb = await this.appConfigRepository.findByAdminId(adminId);

    if (appConfigOnDb) {
      const newPrice = new Pricing({
        [name]: { duration: Number(duration), price: Number(price) },
      }).value;

      const actualPrices = appConfigOnDb.pricing!.value;
      const updatedPrices = new Pricing({ ...actualPrices, ...newPrice });
      const config = new AppConfig(
        appConfigOnDb.id,
        appConfigOnDb.warningDelay,
        appConfigOnDb.defaulterDelay,
        appConfigOnDb.emailContent,
        adminId,
        updatedPrices
      );

      await this.appConfigRepository.updatePricing(config);
    }
  }
}
