import { AppConfig } from '../../../Domain/Entities/AppConfig.entity';
import { IMapper } from '../../../Domain/Interfaces';
import { Pricing } from '../../../Domain/VO/Pricing.vo';

type AppConfigTable = {
  id: string;
  pricing: string;
  warning_delay: number;
  defaulter_delay: number;
  email_content: string;
  adminId: string;
};

export class AppConfigMapper implements IMapper<AppConfig> {
  public domain(appConfigDatamodel: AppConfigTable): AppConfig {
    return new AppConfig(
      appConfigDatamodel.id,
      new Pricing(JSON.parse(appConfigDatamodel.pricing)),
      appConfigDatamodel.warning_delay,
      appConfigDatamodel.defaulter_delay,
      appConfigDatamodel.email_content,
      appConfigDatamodel.adminId
    );
  }

  public datamodel(domain: AppConfig): AppConfigTable {
    return {
      id: domain.id,
      pricing: JSON.stringify(domain.pricing),
      warning_delay: domain.warningDelay,
      defaulter_delay: domain.defaulterDelay,
      email_content: domain.emailContent,
      adminId: domain.adminId!,
    };
  }
}
