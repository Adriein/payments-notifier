import { CreateAppConfigCommand } from '../../../Domain/Commands/AppConfig/CreateAppConfigCommand';
import { Log } from '../../../Domain/Decorators/Log';
import { AppConfig } from '../../../Domain/Entities/AppConfig.entity';
import { ICommand, IHandler } from '../../../Domain/Interfaces';
import { IConfigRepository } from '../../../Domain/Interfaces/IConfigRepository';
import { Pricing } from '../../../Domain/VO/Pricing.vo';

export class CreateAppConfigHandler implements IHandler<void> {
  constructor(private appConfigRepository: IConfigRepository) {}
  
  @Log(process.env.LOG_LEVEL)
  async handle(command: ICommand): Promise<void> {
    const {
      pricing,
      warningDelay,
      defaulterDelay,
      emailContent,
      adminId,
    } = command as CreateAppConfigCommand;

    const appConfigOnDb = await this.appConfigRepository.findByAdminId(adminId);

    if (appConfigOnDb) {
      const config = new AppConfig(
        appConfigOnDb.id,
        new Pricing(pricing),
        warningDelay,
        defaulterDelay,
        emailContent,
        adminId
      );

      await this.appConfigRepository.update(config);
    }

    const config = AppConfig.build(
      new Pricing(pricing),
      warningDelay,
      defaulterDelay,
      emailContent,
      adminId
    );

    await this.appConfigRepository.save(config);
  }
}
