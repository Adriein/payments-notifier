import { ID } from '../../../Domain/VO/Id.vo';
import { DietType } from '../../Domain/VO/DietType.vo';
import { IMapper } from '../../../Shared/Domain/Interfaces/IMapper';
import { Diet } from '../../Domain/Diet.entity';
import { Nutrition } from '../../Domain/Nutrition.entity';
import { Gender } from '../../Domain/VO/Gender.vo';
import { DietDAO } from './Diet.dao';
import { NutritionDAO } from './Nutrition.dao';

export class NutritionMapper implements IMapper<Nutrition, NutritionDAO> {
  datamodel(domain: Nutrition): NutritionDAO {
    return new NutritionDAO(
      domain.id(),
      domain.weight(),
      domain.height(),
      domain.age(),
      domain.gender(),
      domain.userId(),
      domain.createdAt().toUTCString(),
      domain.updatedAt().toUTCString()
    );
  }

  domain(datamodel: NutritionDAO): Nutrition {
    console.log(datamodel);
    
    const diets = datamodel.diets.map((diet: DietDAO) => {
      return new Diet(
        new ID(ID.generate().value),
        diet.diet_name!,
        new ID(diet.nutrition_id!),
        new DietType(diet.objective!),
        diet.kcal!,
        new Date(diet.created_at!),
        new Date(diet.updated_at!)
      );
    });

    return new Nutrition(
      new ID(datamodel.id!),
      new ID(datamodel.user_id!),
      datamodel.weight!,
      datamodel.height!,
      datamodel.age!,
      new Gender(datamodel.gender!),
      diets,
      new Date(datamodel.created_at!),
      new Date(datamodel.updated_at!)
    );
  }
}
