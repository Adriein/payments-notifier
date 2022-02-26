import { ID } from '../../../../Shared/Domain/VO/Id.vo';
import { IMapper } from '../../../../Shared/Domain/Interfaces/IMapper';
import { Nutrition } from '../../Domain/Nutrition.entity';
import { Gender } from '../../Domain/VO/Gender.vo';
import { Prisma } from "@prisma/client";


export class NutritionMapper implements IMapper<Nutrition, Prisma.nutritionCreateInput | Prisma.nutritionUpdateInput> {
  toDomain(dataModel: Prisma.nutritionWhereInput): Nutrition {
    return new Nutrition(
      new ID(dataModel.id! as string),
      new ID(dataModel.user_id! as string),
      new ID(dataModel.admin_id! as string),
      dataModel.weight! as number,
      dataModel.height! as number,
      dataModel.age! as number,
      new Gender(dataModel.gender! as string),
      new Date(dataModel.created_at! as string),
      new Date(dataModel.updated_at! as string),
    );
  }

  toSaveDataModel(domain: Nutrition): Prisma.nutritionCreateInput {
    return {
      id: domain.id().value,
      height: domain.height(),
      weight: domain.weight(),
      gender: domain.gender(),
      age: domain.age(),
      created_at: domain.createdAt(),
      updated_at: domain.updatedAt(),
      user: {
        connect: {
          id: domain.userId(),
        }
      },
      admin: {
        connect: {
          id: domain.adminId()
        }
      }
    }
  }

  toUpdateDataModel(domain: Nutrition): Prisma.nutritionUpdateInput {
    throw new Error()
  }

}