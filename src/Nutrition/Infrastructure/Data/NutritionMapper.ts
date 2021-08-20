import { ID } from '../../../Domain/VO/Id.vo';
import { IMapper } from '../../../Shared/Domain/Interfaces/IMapper';
import { Nutrition } from '../../Domain/Nutrition.entity';
import { Gender } from '../../Domain/VO/Gender.vo';
import { NutritionDAO } from './Nutrition.dao';
import { DietMapper } from './DietMapper';

export class NutritionMapper implements IMapper<Nutrition, NutritionDAO> {
  private dietMapper = new DietMapper();

  public datamodel(domain: Nutrition): NutritionDAO {
    const diets = domain.diets().map(this.dietMapper.datamodel);

    return new NutritionDAO(
      domain.id(),
      domain.weight(),
      domain.height(),
      domain.age(),
      domain.gender(),
      domain.userId(),
      domain.createdAt().toUTCString(),
      domain.updatedAt().toUTCString(),
      diets
    );
  }

  public domain(datamodel: NutritionDAO): Nutrition {
    const diets = datamodel.diets.map(this.dietMapper.domain);

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
