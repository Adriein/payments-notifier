import { ID } from '../../../Domain/VO/Id.vo';
import { IMapper } from '../../../Shared/Domain/Interfaces/IMapper';
import { Nutrition } from '../../Domain/Nutrition.entity';
import { Gender } from '../../Domain/VO/Gender.vo';
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
      domain.createdAt(),
      domain.updatedAt()
    );
  }
  domain(datamodel: NutritionDAO): Nutrition {
    return new Nutrition(
      new ID(datamodel.id!),
      new ID(datamodel.user_id!),
      datamodel.weight!,
      datamodel.height!,
      datamodel.age!,
      new Gender(datamodel.gender!)
    );
  }
}
