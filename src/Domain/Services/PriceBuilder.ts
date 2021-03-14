import { Log } from '../Decorators/Log';
import { AppConfig } from '../Entities/AppConfig.entity';
import { IConfigRepository } from '../Interfaces/IConfigRepository';
import { Pricing } from '../VO/Pricing.vo';

export class PriceBuilder {
  constructor(private appConfigRepository: IConfigRepository) {}

  @Log(process.env.LOG_LEVEL)
  public async build(adminId: string, pricing: string) {
    const config = (await this.appConfigRepository.findByAdminId(
      adminId
    )) as AppConfig;

    return new Pricing({
      [pricing]: config.pricing.value[pricing],
    });
  }
}
