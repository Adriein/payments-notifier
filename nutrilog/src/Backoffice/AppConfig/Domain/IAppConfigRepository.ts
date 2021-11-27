import { IRepository } from "../../../Shared/Domain/Interfaces/IRepository";
import { AppConfig } from "./AppConfig.entity";

export interface IAppConfigRepository extends IRepository<AppConfig> {
  findByAdminId(adminId: string): Promise<AppConfig | undefined>;
}
