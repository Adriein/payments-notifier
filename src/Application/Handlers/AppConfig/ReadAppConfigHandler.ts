import { ReadAppConfigCommand } from '../../../Domain/Commands/AppConfig/ReadAppConfigCommand';
import { Log } from '../../../Domain/Decorators/Log';
import { AppConfig } from '../../../Domain/Entities/AppConfig.entity';
import { ICommand, IHandler } from '../../../Domain/Interfaces';
import { IConfigRepository } from '../../../Domain/Interfaces/IConfigRepository';

export class ReadAppConfigHandler implements IHandler<AppConfig> {
  constructor(private appConfigRepository: IConfigRepository) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(comm: ICommand): Promise<AppConfig> {
    const { adminId } = comm as ReadAppConfigCommand;

    return (await this.appConfigRepository.findByAdminId(adminId)) as AppConfig;
  }
}
