import { AppConfig } from '../../../Domain/Entities/AppConfig.entity';
import { IMapper } from '../../../Domain/Interfaces';

type AppConfigTable = {
  id: string;
  pricing: string;
  warningDelay: number;
  defaulterDelay: number;
  emailContent: string;
  adminId: string;
};

export class AppConfigMapper implements IMapper<AppConfig> {
  public domain(appConfigDatamodel: AppConfigTable): AppConfig {
    return new AppConfig(
      appConfigDatamodel.id,
      appConfigDatamodel.pricing,
      appConfigDatamodel.warningDelay,
      appConfigDatamodel.defaulterDelay,
      appConfigDatamodel.adminId
    );
  }

  public datamodel(domain: AppConfig): AppConfigTable {
    return {
      id: domain.id,
      pricing: domain.pricing,
      warningDelay: domain.warningDelay,
      defaulterDelay: domain.defaulterDelay,
      emailContent: domain.emailContent,
      adminId: domain.adminId!,
    };
  }
}
