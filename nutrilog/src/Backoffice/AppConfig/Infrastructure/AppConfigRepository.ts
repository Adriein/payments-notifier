import { IAppConfigRepository } from "../Domain/IAppConfigRepository";
import { AppConfig } from "../Domain/AppConfig.entity";
import { Criteria } from "../../../Shared/Domain/Entities/Criteria";
import { Log } from "../../../Shared/Domain/Decorators/Log";
import Database from "../../../Infraestructure/Data/Database";
import { AppConfigMapper } from "./AppConfigMapper";

export class AppConfigRepository implements IAppConfigRepository {
  private mapper = new AppConfigMapper();
  private prisma = Database.getInstance().getConnection();

  delete(entity: AppConfig): Promise<void> {
    return Promise.resolve(undefined);
  }

  find(criteria?: Criteria): Promise<AppConfig[]> {
    return Promise.resolve([]);
  }

  findOne(id: string): Promise<AppConfig | undefined> {
    return Promise.resolve(undefined);
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

  public async findByAdminId(adminId: string): Promise<AppConfig | undefined> {
    try {
      const result = await this.prisma.app_config.findUnique({
        where: {
          id: adminId
        }
      });
      this.prisma.$disconnect();

      if (!result) {
        return undefined;
      }

      return this.mapper.toDomain(result);
    } catch (error) {
      this.prisma.$disconnect();
      throw error;
    }
  }

}