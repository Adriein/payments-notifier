import { IHandler } from "../../../Shared/Domain/Interfaces/IHandler";
import { GetAppConfigQuery } from "../Domain/GetAppConfigQuery";
import { QueryHandler } from "../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { AppConfigResponse } from "./AppConfigResponse";
import { IAppConfigRepository } from "../Domain/IAppConfigRepository";
import { AppConfigNotExists } from "../Domain/AppConfigNotExists";

@QueryHandler(GetAppConfigQuery)
export class GetAppConfigHandler implements IHandler<AppConfigResponse> {
  constructor(private readonly repository: IAppConfigRepository) {}

  public async handle(query: GetAppConfigQuery): Promise<AppConfigResponse> {
    const appConfig = await this.repository.findByAdminId(query.id);

    if (!appConfig) {
      throw new AppConfigNotExists(query.id);
    }

    return new AppConfigResponse(
      appConfig.id(),
      appConfig.warningDelay(),
      appConfig.notificationDelay(),
      appConfig.emailContent(),
      appConfig.lastSentReport()
    )
  }
}