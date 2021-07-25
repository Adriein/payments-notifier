import { Log } from '../../Domain/Decorators/Log';
import { IHandler } from '../../Domain/Interfaces';
import { INutritionRepository } from '../Domain/INutritionRepository';
import { ID } from '../../Domain/VO/Id.vo';
import { ModifyDietCommand } from '../Domain/Commands/ModifyDietCommand';
import { Diet } from '../Domain/Diet.entity';
import { NutritionFinder } from '../Domain/Services/NutritionFinder';

export class ModifyDietHandler implements IHandler<void> {
  constructor(
    private repository: INutritionRepository,
    private finder: NutritionFinder
  ) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(command: ModifyDietCommand): Promise<void> {
    const nutritionId = new ID(command.nutritionId);
    const dietId = new ID(command.dietId);

    const nutrition = await this.finder.find(nutritionId);

    const diet = nutrition.getOneDiet(dietId);

    diet.flush();

    command.meals.forEach((meal) => {
      diet.add(meal.name, meal.foods);
    });

    nutrition.modifyDiet(diet);

    await this.repository.update(nutrition);
  }
}
