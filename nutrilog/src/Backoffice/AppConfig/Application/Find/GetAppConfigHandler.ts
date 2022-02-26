import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { GetAppConfigQuery } from "../../Domain/Query/GetAppConfigQuery";
import { QueryHandler } from "../../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { AppConfigResponse } from "./AppConfigResponse";
import { IAppConfigRepository } from "../../Domain/IAppConfigRepository";
import { AppConfigNotExists } from "../../Domain/AppConfigNotExists";
import { Log } from "../../../../Shared/Domain/Decorators/Log";

@QueryHandler(GetAppConfigQuery)
export class GetAppConfigHandler implements IHandler<AppConfigResponse> {
  constructor(private readonly repository: IAppConfigRepository) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(query: GetAppConfigQuery): Promise<AppConfigResponse> {
    const result = await this.repository.findByAdminId(query.id);

    if (result.isLeft()) {
      throw result.value;
    }

    const appConfig = result.value;

    return new AppConfigResponse(
      appConfig.id().value,
      appConfig.warningDelay(),
      appConfig.notificationDelay(),
      appConfig.emailContent(),
      appConfig.lastSentReport()
    )
  }
}