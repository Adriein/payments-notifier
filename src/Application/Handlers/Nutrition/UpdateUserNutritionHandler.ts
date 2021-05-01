import { UpdateUserNutritionCommand } from '../../../Domain/Commands/Nutrition/UpdateUserNutritionCommand';
import { Log } from '../../../Domain/Decorators/Log';
import { Nutrition } from '../../../Domain/Entities/Nutrition.entity';
import { NutritionNotExistsError } from '../../../Domain/Errors/Nutrition/NutritionNotExistsError';
import { ICommand } from '../../../Domain/Interfaces';
import { INutritionRepository } from '../../../Domain/Interfaces/INutritionRepository';
import { Activity } from '../../../Domain/VO/Activity.vo';
import { Age } from '../../../Domain/VO/Age.vo';
import { Gender } from '../../../Domain/VO/Gender.vo';
import { NutritionObjective } from '../../../Domain/VO/NutritionObjective.vo';

export class UpdateUserNutritionHandler {
  constructor(private nutritionRepository: INutritionRepository) {}

  @Log(process.env.LOG_LEVEL)
  async handle(comm: ICommand): Promise<void> {
    const command = comm as UpdateUserNutritionCommand;

    const nutritionOnDb = await this.nutritionRepository.findByUserId(
      command.userId
    );

    if(!nutritionOnDb) {
      throw new NutritionNotExistsError();
    }

    const nutrition = new Nutrition(
      nutritionOnDb.id(),
      command.weight,
      command.height,
      new NutritionObjective(command.objective),
      new Age(command.age),
      new Activity(command.activity),
      new Gender(command.gender),
      nutritionOnDb.userId()
    );

    await this.nutritionRepository.update(nutrition)
  }
}
