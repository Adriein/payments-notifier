import { AppConfig } from '../Entities/AppConfig.entity';
import { IConfigRepository } from '../Interfaces/IConfigRepository';

export class UserPriceBuilder {
  constructor(private appConfigRepository: IConfigRepository) {}

  public async build(adminId: string, pricing: string) {
    const config = (await this.appConfigRepository.findByAdminId(
      adminId
    )) as AppConfig;

    return {
      [pricing]: config.pricing.pricingType[pricing],
    };
  }
}
