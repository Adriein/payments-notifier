import { ApiUsage } from '../../Domain/ApiUsage.entity';
import { IApiUsageRepository } from '../../Domain/IApiUsageRepository';
import { ApiUsageMapper } from './ApiUsageMapper';
import { Either } from "../../../../Shared/Domain/types";
import Database from "../../../../Shared/Infrastructure/Data/Database";

export class ApiUsageRepository implements IApiUsageRepository {
  private mapper: ApiUsageMapper = new ApiUsageMapper();
  private prisma = Database.instance().connection();

  delete(entity: any): Promise<void> {
    return Promise.resolve(undefined);
  }

  find(adminId: string): Promise<Either<Error, any[]>> {
    throw new Error('not implemented');
  }

  findOne(id: string): Promise<Either<Error, any>> {
    throw new Error('not implemented');
  }

  public async save(entity: ApiUsage): Promise<void> {
    try {
      const data = this.mapper.toSaveDataModel(entity);

      await this.prisma.nutritionix_api_metadata.create({ data });
      this.prisma.$disconnect();
    } catch (error: any) {
      this.prisma.$disconnect();
      throw error;
    }
  }

  update(entity: any): Promise<void> {
    return Promise.resolve(undefined);
  }


}
