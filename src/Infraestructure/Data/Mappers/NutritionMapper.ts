import { Nutrition } from '../../../Domain/Entities/Nutrition.entity';
import { IMapper } from '../../../Domain/Interfaces';
import { Activity } from '../../../Domain/VO/Activity.vo';
import { Age } from '../../../Domain/VO/Age.vo';
import { Gender } from '../../../Domain/VO/Gender.vo';
import { NutritionObjective } from '../../../Domain/VO/NutritionObjective.vo';

type NutritionTable = {
  id: string;
  weight: number;
  height: number;
  age: number;
  activity: string;
  objective: string;
  gender: string;
  user_id: string;
};

export class NutritionMapper implements IMapper<Nutrition> {
  public domain(datamodel: NutritionTable): Nutrition {
    return new Nutrition(
      datamodel.id,
      datamodel.weight,
      datamodel.height,
      new NutritionObjective(datamodel.objective),
      new Age(datamodel.age),
      new Activity(datamodel.activity),
      new Gender(datamodel.gender),
      datamodel.user_id
    );
  }
  public datamodel(domain: Nutrition): NutritionTable {
    return {
      id: domain.id(),
      weight: domain.weight(),
      height: domain.height(),
      age: domain.age(),
      activity: domain.activity(),
      objective: domain.objective(),
      gender: domain.gender(),
      user_id: domain.userId(),
    };
  }
}
