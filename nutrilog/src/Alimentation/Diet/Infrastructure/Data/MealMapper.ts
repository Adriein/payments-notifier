import { ID } from '../../../../Shared/Domain/VO/Id.vo';
import { IMapper } from '../../../../Shared/Domain/Interfaces/IMapper';
import { Meal } from '../../Domain/Meal.entity';
import { Prisma } from "@prisma/client";


export class MealMapper implements IMapper<Meal, Prisma.mealCreateInput | Prisma.mealUpdateInput> {
  toDomain<C>(dataModel: C): Meal {
    throw new Error();
  }

  toSaveDataModel(domain: Meal): Prisma.mealCreateInput | Prisma.mealUpdateInput {
    return {}
  }

  toUpdateDataModel(domain: Meal): Prisma.mealCreateInput | Prisma.mealUpdateInput {
    throw new Error();
  }

}

