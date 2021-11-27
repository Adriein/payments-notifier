import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { Log } from "../../../../Shared/Domain/Decorators/Log";
import { ModifyAppConfigCommand } from "../../Domain/Command/ModifyAppConfigCommand";
import { CommandHandler } from "../../../../Shared/Domain/Decorators/CommandHandler.decorator";
import { AppConfig } from "../../Domain/AppConfig.entity";
import { AppConfigNotExists } from "../../Domain/AppConfigNotExists";
import { IAppConfigRepository } from "../../Domain/IAppConfigRepository";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";

@CommandHandler(ModifyAppConfigCommand)
export class ModifyAppConfigHandler implements IHandler<void> {
  constructor(private readonly repository: IAppConfigRepository) {}

  @Log(process.env.LOG_LEVEL)
  async handle(command: ModifyAppConfigCommand): Promise<void> {
    const { warningDelay, emailContent, adminId } = command;

    const id = new ID(adminId);

    const appConfigOnDb = await this.repository.findByAdminId(id.value)

    if (!appConfigOnDb) {
      throw new AppConfigNotExists(id.value);
    }

    const config = new AppConfig(
      new ID(appConfigOnDb.id()),
      Number(warningDelay),
      appConfigOnDb.notificationDelay(),
      emailContent,
      appConfigOnDb.lastSentReport(),
      appConfigOnDb.userId(),
      appConfigOnDb.createdAt(),
      new Date()
    );

    await this.repository.update(config);
  }
}