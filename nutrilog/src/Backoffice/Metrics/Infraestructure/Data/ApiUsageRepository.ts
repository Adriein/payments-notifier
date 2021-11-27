import { IMapper } from '../../../../Shared/Domain/Interfaces/IMapper';
import { ApiUsage } from '../../Domain/ApiUsage.entity';
import { IApiUsageRepository } from '../../Domain/IApiUsageRepository';
import { ApiUsageDAO } from './ApiUsage.dao';
import { ApiUsageMapper } from './ApiUsageMapper';
import { Criteria } from "../../../../Shared/Domain/Entities/Criteria";

export class ApiUsageRepository implements IApiUsageRepository {
  private mapper: IMapper<ApiUsage, ApiUsageDAO> = new ApiUsageMapper();

  public async findOne(id: string): Promise<ApiUsage> {
    throw new Error('Method not implemented.');
  }

  find(criteria: Criteria): Promise<ApiUsage[]> {
    throw new Error('Method not implemented.');
  }

  public async save(entity: ApiUsage): Promise<void> {

  }

  update(entity: ApiUsage): Promise<void> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
