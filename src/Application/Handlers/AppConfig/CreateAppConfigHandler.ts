import { CreateAppConfigCommand } from '../../../Domain/Commands/AppConfig/CreateAppConfigCommand';
import { Log } from '../../../Domain/Decorators/Log';
import { AppConfig } from '../../../Domain/Entities/AppConfig.entity';
import { IHandler } from '../../../Domain/Interfaces';
import { IConfigRepository } from '../../../Domain/Interfaces/IConfigRepository';
import { ICommand } from "../../../Shared/Domain/Interfaces/ICommand";

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
        warningDelay,
        defaulterDelay,
        emailContent,
        adminId,
        appConfigOnDb.pricing
      );

      await this.appConfigRepository.update(config);
    }

    const config = AppConfig.build(
      pricing,
      warningDelay,
      defaulterDelay,
      emailContent,
      adminId
    );

    await this.appConfigRepository.save(config);
  }
}
