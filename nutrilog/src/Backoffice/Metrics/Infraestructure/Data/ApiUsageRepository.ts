import { IMapper } from '../../../../Shared/Domain/Interfaces/IMapper';
import { ApiUsage } from '../../Domain/ApiUsage.entity';
import { IApiUsageRepository } from '../../Domain/IApiUsageRepository';
import { ApiUsageMapper } from './ApiUsageMapper';
import { Either } from "../../../../Shared/Domain/types";

export class ApiUsageRepository implements IApiUsageRepository {
  delete(entity: any): Promise<void> {
    return Promise.resolve(undefined);
  }

  find(adminId: string): Promise<Either<Error, any[]>> {
    throw new Error('not implemented');
  }

  findOne(id: string): Promise<Either<Error, any>> {
    throw new Error('not implemented');
  }

  save(entity: any): Promise<void> {
    return Promise.resolve(undefined);
  }

  update(entity: any): Promise<void> {
    return Promise.resolve(undefined);
  }


}
