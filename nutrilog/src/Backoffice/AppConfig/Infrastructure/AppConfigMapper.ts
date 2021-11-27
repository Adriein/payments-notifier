import { IMapper } from "../../../Shared/Domain/Interfaces/IMapper";
import { AppConfig } from "../Domain/AppConfig.entity";

export class AppConfigMapper implements IMapper<AppConfig, any> {
  toDataModel(domain: AppConfig): any {
    return undefined;
  }

  public toDomain(dataModel: any): AppConfig {
    return new AppConfig(
      dataModel.id,
      dataModel.warning_delay,
      dataModel.notification_delay,
      dataModel.email_content,
      dataModel.last_sent_report,
      dataModel.user_id,
      dataModel.created_at,
      dataModel.updated_at,
    );
  }

}