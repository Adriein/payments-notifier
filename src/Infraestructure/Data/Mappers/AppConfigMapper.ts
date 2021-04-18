import { AppConfig } from '../../../Domain/Entities/AppConfig.entity';
import { IMapper } from '../../../Domain/Interfaces';
import { Pricing } from '../../../Domain/VO/Pricing.vo';

type AppConfigTable = {
  id: string;
  pricing: string;
  warning_delay: number;
  defaulter_delay: number;
  email_content: string;
  user_id: string;
};

export class AppConfigMapper implements IMapper<AppConfig> {
  public domain(appConfigDatamodel: AppConfigTable): AppConfig {
    return new AppConfig(
      appConfigDatamodel.id,
      appConfigDatamodel.warning_delay,
      appConfigDatamodel.defaulter_delay,
      appConfigDatamodel.email_content,
      appConfigDatamodel.user_id,
      new Pricing(JSON.parse(appConfigDatamodel.pricing))
    );
  }

  public datamodel(domain: AppConfig): AppConfigTable {
    return {
      id: domain.id,
      pricing: JSON.stringify(domain.pricing!.value),
      warning_delay: domain.warningDelay,
      defaulter_delay: domain.defaulterDelay,
      email_content: domain.emailContent,
      user_id: domain.adminId!,
    };
  }
}
