import { IMapper } from '../../../Shared/Domain/Interfaces/IMapper';
import { ApiUsage } from '../../Domain/ApiUsage.entity';
import { ApiUsageDAO } from './ApiUsage.dao';

export class ApiUsageMapper implements IMapper<ApiUsage, ApiUsageDAO> {
  datamodel(domain: ApiUsage): ApiUsageDAO {
    return new ApiUsageDAO(
      domain.id(),
      domain.userId(),
      domain.apiCalls(),
      domain.createdAt().toUTCString(),
      domain.updatedAt().toUTCString()
    );
  }
  domain(datamodel: ApiUsageDAO): ApiUsage {
    throw new Error('Method not implemented.');
  }
}
