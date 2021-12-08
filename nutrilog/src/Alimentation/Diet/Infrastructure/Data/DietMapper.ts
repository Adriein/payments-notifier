import { ID } from '../../../../Shared/Domain/VO/Id.vo';
import { DietType } from '../../Domain/VO/DietType.vo';
import { IMapper } from '../../../../Shared/Domain/Interfaces/IMapper';
import { Diet } from '../../Domain/Diet.entity';
import { MealMapper } from './MealMapper';
import { Prisma } from "@prisma/client";

export class DietMapper implements IMapper<Diet, Prisma.dietCreateInput | Prisma.dietUpdateInput> {
  toDomain(dataModel: Prisma.dietWhereInput): Diet {
    return new Diet(
      new ID(dataModel.id as string),
      dataModel.diet_name as string,
      new ID(dataModel.nutrition_id as string),
      new DietType(dataModel.objective as string),
      dataModel.kcal as number,
      dataModel.active as boolean,
      [],
      new Date(dataModel.created_at as string),
      new Date(dataModel.updated_at as string)
    );
  }

  toSaveDataModel(domain: Diet): Prisma.dietCreateInput {
    return {
      id: domain.id(),
      kcal: domain.kcal(),
      active: domain.active(),
      objective: domain.objective(),
      diet_name: domain.name(),
      created_at: domain.createdAt(),
      updated_at: domain.updatedAt(),
      nutrition: {
        connect: {
          id: domain.nutritionId()
        }
      },
      meals: {
        connect: []
      }
    };
  }

  toUpdateDataModel(domain: Diet): Prisma.dietUpdateInput {
    throw new Error();
  }

}
