import { IHandler } from "../../../Shared/Domain/Interfaces/IHandler";
import { GetAppConfigQuery } from "../Domain/GetAppConfigQuery";
import { QueryHandler } from "../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { GetAppConfigDto } from "./GetAppConfigDto";
import { IAppConfigRepository } from "../Domain/IAppConfigRepository";
import { AppConfigNotExists } from "../Domain/AppConfigNotExists";

@QueryHandler(GetAppConfigQuery)
export class GetAppConfigHandler implements IHandler<GetAppConfigDto> {
  constructor(private readonly repository: IAppConfigRepository) {}

  public async handle(query: GetAppConfigQuery): Promise<GetAppConfigDto> {
    const appConfig = await this.repository.findByAdminId(query.id);

    if (!appConfig) {
      throw new AppConfigNotExists(query.id);
    }

    return new GetAppConfigDto(
      appConfig.id(),
      appConfig.warningDelay(),
      appConfig.notificationDelay(),
      appConfig.emailContent(),
      appConfig.lastSentReport()
    )
  }
}