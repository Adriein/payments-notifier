import { Log } from '../../Domain/Decorators/Log';
import { IHandler } from '../../Domain/Interfaces';
import { INutritionRepository } from '../Domain/INutritionRepository';
import { ID } from '../../Domain/VO/Id.vo';
import { CreateDietCommand } from '../Domain/Commands/CreateDietCommand';
import { DietType } from '../Domain/VO/DietType.vo';
import { NutritionFinder } from '../Domain/Services/NutritionFinder';

export class CreateDietHandler implements IHandler<void> {
  constructor(
    private repository: INutritionRepository,
    private finder: NutritionFinder
  ) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(command: CreateDietCommand): Promise<void> {
    const nutritionId = new ID(command.nutritionId);
    const objective = new DietType(command.objective);
    
    const nutrition = await this.finder.find(nutritionId);

    nutrition.createDiet(command.name, objective, command.kcalChange);

    await this.repository.saveDiet(nutrition);
  }
}
