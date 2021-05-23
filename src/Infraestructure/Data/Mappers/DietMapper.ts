import { Diet } from '../../../Domain/Entities/Diet.entity';
import { DietCustomitzation } from '../../../Domain/Entities/DietCustomitzation.entity';
import { IMapper } from '../../../Domain/Interfaces';

type DietTable = {
  id: string;
  max_kcal: number;
  user_id: string;
};

export class DietMapper implements IMapper<Diet> {
  public domain(datamodel: DietTable): Diet {
    return new Diet(
      datamodel.id,
      [],
      datamodel.max_kcal,
      datamodel.user_id,
      '',
      new DietCustomitzation('', '')
    );
  }
  public datamodel(domain: Diet): DietTable {
    return {
      id: domain.id(),
      max_kcal: domain.maxKcal(),
      user_id: domain.userId(),
    };
  }
}
