import { AppConfig } from '../Entities/AppConfig.entity';
import { IRepository } from './IRepository';

export interface IConfigRepository extends IRepository<AppConfig> {
  findByAdminId(id: string): Promise<AppConfig | undefined>;
  updatePricing(config: AppConfig): Promise<void>;
  updateLastReportDate(id: string): Promise<void>;
}
