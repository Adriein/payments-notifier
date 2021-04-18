import { ModifyAppConfigCommand } from '../../../Domain/Commands/AppConfig/ModifyAppConfigCommand';
import { Log } from '../../../Domain/Decorators/Log';
import { AppConfig } from '../../../Domain/Entities/AppConfig.entity';
import { AppConfigNotExistsError } from '../../../Domain/Errors/AppConfig/AppConfigNotExists';
import { ICommand, IHandler } from '../../../Domain/Interfaces';
import { IConfigRepository } from '../../../Domain/Interfaces/IConfigRepository';

export class ModifyAppConfigHandler implements IHandler<void> {
  constructor(private appConfigRepository: IConfigRepository) {}

  @Log(process.env.LOG_LEVEL)
  async handle(command: ICommand): Promise<void> {
    const { warningDelay, emailContent, adminId } = command as ModifyAppConfigCommand;

    const appConfigOnDb = await this.appConfigRepository.findByAdminId(adminId);

    if (!appConfigOnDb) {
      throw new AppConfigNotExistsError();
    }

    const config = new AppConfig(
      appConfigOnDb.id,
      Number(warningDelay),
      appConfigOnDb.defaulterDelay,
      emailContent,
      adminId,
      appConfigOnDb.pricing
    );

    await this.appConfigRepository.update(config);
  }
}
