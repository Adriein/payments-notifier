import { IAppConfigRepository } from "../Domain/IAppConfigRepository";
import { AppConfig } from "../Domain/AppConfig.entity";
import { Log } from "../../../Shared/Domain/Decorators/Log";
import Database from "../../../Shared/Infrastructure/Data/Database";
import { AppConfigMapper } from "./AppConfigMapper";
import { Either } from "../../../Shared/Domain/types";
import { AppConfigNotExists } from "../Domain/AppConfigNotExists";
import { Left } from "../../../Shared/Domain/Entities/Left";
import { Right } from "../../../Shared/Domain/Entities/Right";

export class AppConfigRepository implements IAppConfigRepository {
  private mapper = new AppConfigMapper();
  private prisma = Database.instance().connection();

  delete(entity: AppConfig): Promise<void> {
    return Promise.resolve(undefined);
  }

  find(criteria?: any): Promise<Either<Error, AppConfig[]>> {
    throw new Error('not implemented');
  }

  findOne(id: string): Promise<Either<Error, AppConfig>> {
    throw new Error('not implemented');
  }

  @Log(process.env.LOG_LEVEL)
  public async save(entity: AppConfig): Promise<void> {
    try {
      const data = this.mapper.toSaveDataModel(entity);
      await this.prisma.app_config.create({ data })
      this.prisma.$disconnect();
    } catch (error) {
      this.prisma.$disconnect();
      throw error;
    }
  }

  update(entity: AppConfig): Promise<void> {
    return Promise.resolve(undefined);
  }

  @Log(process.env.LOG_LEVEL)
  public async findByAdminId(adminId: string): Promise<Either<Error | AppConfigNotExists, AppConfig>> {
    try {
      const result = await this.prisma.app_config.findUnique({
        where: {
          id: adminId
        }
      });
      this.prisma.$disconnect();

      if (!result) {
        return Left.error(new AppConfigNotExists(adminId));
      }

      return Right.success(this.mapper.toDomain(result));
    } catch (error) {
      this.prisma.$disconnect();
      throw error;
    }
  }

}