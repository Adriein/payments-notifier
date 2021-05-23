import { DietCustomitzation } from '../../../Domain/Entities/DietCustomitzation.entity';
import { IMapper } from '../../../Domain/Interfaces';

type DietCustomitzationTable = {
  id: string;
  weekly_organized: boolean;
  meal_organized: boolean;
  diet_id: string;
};

export class DietCustomizationMapper implements IMapper<DietCustomitzation> {
  public domain(datamodel: DietCustomitzationTable): DietCustomitzation {
    return new DietCustomitzation(
      datamodel.id,
      datamodel.diet_id,
      datamodel.weekly_organized,
      datamodel.meal_organized
    );
  }
  public datamodel(domain: DietCustomitzation): DietCustomitzationTable {
    return {
      id: domain.id,
      diet_id: domain.dietId,
      weekly_organized: domain.isWeeklyOrganized,
      meal_organized: domain.isMealOrganized,
    };
  }
}
