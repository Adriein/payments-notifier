import { Log } from '../../Domain/Decorators/Log';
import { IHandler } from '../../Domain/Interfaces';
import { INutritionRepository } from '../Domain/INutritionRepository';
import { Nutrition } from '../Domain/Nutrition.entity';
import { ID } from '../../Domain/VO/Id.vo';
import { CreateNutritionCommand } from '../Domain/Commands/CreateNutritionCommand';
import { Gender } from '../Domain/VO/Gender.vo';
import { ModifyDietCommand } from '../Domain/Commands/ModifyDietCommand';
import { Diet } from '../Domain/Diet.entity';

export class ModifyDietHandler implements IHandler<void> {
  constructor(private repository: INutritionRepository) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(command: ModifyDietCommand): Promise<void> {
    const nutritionId = new ID(command.nutritionId);
    const dietId = new ID(command.dietId);

    const nutrition = await this.repository.findOne(nutritionId.value);

    if (!nutrition) {
      throw new Error();
    }

    const diet = nutrition
      ?.diets()
      .find((diet: Diet) => diet.id() === dietId.value);

    await this.repository.save(nutrition);
  }
}
