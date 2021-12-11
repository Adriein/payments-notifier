import { IMapper } from '../../../../Shared/Domain/Interfaces/IMapper';
import { ApiUsage } from '../../Domain/ApiUsage.entity';
import { Prisma } from "@prisma/client";

export class ApiUsageMapper implements IMapper<ApiUsage, Prisma.nutritionix_api_metadataCreateInput | Prisma.nutritionix_api_metadataUpdateInput> {
  toDomain<C>(dataModel: C): ApiUsage {
    throw new Error('not implemented yet');
  }

  toSaveDataModel(domain: ApiUsage): Prisma.nutritionix_api_metadataCreateInput {
    return {
      id: domain.id(),
      admin_id: domain.adminId(),
      api_calls: domain.apiCalls(),
      created_at: domain.createdAt(),
      updated_at: domain.updatedAt()
    }
  }

  toUpdateDataModel(domain: ApiUsage): any {
    return undefined;
  }


}
