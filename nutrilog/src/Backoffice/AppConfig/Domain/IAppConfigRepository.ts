import { IRepository } from "../../../Shared/Domain/Interfaces/IRepository";
import { AppConfig } from "./AppConfig.entity";
import { Either } from "../../../Shared/Domain/types";
import { AppConfigNotExists } from "./AppConfigNotExists";

export interface IAppConfigRepository extends IRepository<AppConfig> {
  findByAdminId(adminId: string): Promise<Either<Error | AppConfigNotExists, AppConfig>>;
}
