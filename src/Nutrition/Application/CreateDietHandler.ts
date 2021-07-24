import { Log } from '../../Domain/Decorators/Log';
import { IHandler } from '../../Domain/Interfaces';
import { INutritionRepository } from '../Domain/INutritionRepository';
import { ID } from '../../Domain/VO/Id.vo';
import { CreateDietCommand } from '../Domain/Commands/CreateDietCommand';
import { DietType } from '../Domain/VO/DietType.vo';

export class CreateDietHandler implements IHandler<void> {
  constructor(private repository: INutritionRepository) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(command: CreateDietCommand): Promise<void> {
    const nutritionId = new ID(command.nutritionId);
    const objective = new DietType(command.objective);
    const nutrition = await this.repository.findOne(nutritionId.value);

    if (!nutrition) {
      throw new Error();
    }

    nutrition.createDiet(command.name, objective, command.kcalChange);

    await this.repository.update(nutrition);
  }
}
