import { Log } from '../../Domain/Decorators/Log';
import { IHandler } from '../../Domain/Interfaces';
import { INutritionRepository } from '../Domain/INutritionRepository';
import { Nutrition } from '../Domain/Nutrition.entity';
import { ID } from '../../Domain/VO/Id.vo';
import { CreateNutritionCommand } from '../Domain/Commands/CreateNutritionCommand';
import { Gender } from '../Domain/VO/Gender.vo';

export class CreateNutritionHandler implements IHandler<void> {
  constructor(private repository: INutritionRepository) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(command: CreateNutritionCommand): Promise<void> {
    const userId = new ID(command.userId);
    const gender = new Gender(command.gender);

    const nutrition = Nutrition.build(
      userId,
      command.weight,
      command.height,
      command.age,
      gender
    );

    await this.repository.save(nutrition);
  }
}