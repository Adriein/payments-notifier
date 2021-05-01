import { ICommand, IHandler } from '../../../Domain/Interfaces';
import { Log } from '../../../Domain/Decorators/Log';
import { CreateUserNutritionCommand } from '../../../Domain/Commands/Nutrition/CreateUserNutritionCommand';
import { INutritionRepository } from '../../../Domain/Interfaces/INutritionRepository';
import { NutritionAlreadyExistsError } from '../../../Domain/Errors/Nutrition/NutritionAlreadyExists';
import { Nutrition } from '../../../Domain/Entities/Nutrition.entity';
import { NutritionObjective } from '../../../Domain/VO/NutritionObjective.vo';
import { Activity } from '../../../Domain/VO/Activity.vo';
import { Gender } from '../../../Domain/VO/Gender.vo';
import { Age } from '../../../Domain/VO/Age.vo';

export class CreateUserNutritionHandler implements IHandler<void> {
  constructor(private nutritionRepository: INutritionRepository) {}

  @Log(process.env.LOG_LEVEL)
  async handle(comm: ICommand): Promise<void> {
    const command = comm as CreateUserNutritionCommand;

    const nutritionOnDb = await this.nutritionRepository.findByUserId(command.userId);

    if (nutritionOnDb) {
      throw new NutritionAlreadyExistsError();
    }

    const nutrition = Nutrition.build(
      command.weight,
      command.height,
      new NutritionObjective(command.objective),
      new Age(command.age),
      new Activity(command.activity),
      new Gender(command.gender),
      command.userId
    );

    await this.nutritionRepository.save(nutrition);
  }
}
