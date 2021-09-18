import { Criteria } from '../../../Domain/Entities/Criteria.entity';
import { IMapper } from '../../../Shared/Domain/Interfaces/IMapper';
import { ApiUsage } from '../../Domain/ApiUsage.entity';
import { IApiUsageRepository } from '../../Domain/IApiUsageRepository';
import { ApiUsageDAO } from './ApiUsage.dao';
import { ApiUsageMapper } from './ApiUsageMapper';

export class ApiUsageRepository implements IApiUsageRepository {
  private mapper: IMapper<ApiUsage, ApiUsageDAO> = new ApiUsageMapper();

  public async findOne(id: string): Promise<ApiUsage> {
    throw new Error('Method not implemented.');
  }

  find(adminId: string, criteria: Criteria): Promise<ApiUsage[]> {
    throw new Error('Method not implemented.');
  }
  public async save(entity: ApiUsage): Promise<void> {
    const dao = this.mapper.datamodel(entity);

    await dao.save();
  }
  update(entity: ApiUsage): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
