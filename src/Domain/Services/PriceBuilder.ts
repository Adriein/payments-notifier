import { AppConfig } from '../Entities/AppConfig.entity';
import { IConfigRepository } from '../Interfaces/IConfigRepository';
import { Pricing } from '../VO/Pricing.vo';

export class PriceBuilder {
  constructor(private appConfigRepository: IConfigRepository) {}

  public async build(adminId: string, pricing: string) {
    const config = (await this.appConfigRepository.findByAdminId(
      adminId
    )) as AppConfig;

    return new Pricing({
      [pricing]: config.pricing.value[pricing],
    });
  }
}
