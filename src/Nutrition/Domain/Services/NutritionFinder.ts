import { ID } from '../../../Domain/VO/Id.vo';
import { INutritionRepository } from '../INutritionRepository';
import { Nutrition } from '../Nutrition.entity';

export class NutritionFinder {
  constructor(private repository: INutritionRepository) {}

  public async find(nutritionId: ID): Promise<Nutrition> {
    const nutrition = await this.repository.findOne(nutritionId.value);

    if (!nutrition) {
      throw new Error('No nutrition found with this id');
    }

    return nutrition;
  }
}
