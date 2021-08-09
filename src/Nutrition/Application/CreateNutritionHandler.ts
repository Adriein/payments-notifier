import { Log } from '../../Domain/Decorators/Log';
import { IHandler } from '../../Domain/Interfaces';
import { INutritionRepository } from '../Domain/INutritionRepository';
import { Nutrition } from '../Domain/Nutrition.entity';
import { ID } from '../../Domain/VO/Id.vo';
import { CreateNutritionCommand } from '../Domain/Commands/CreateNutritionCommand';
import { Gender } from '../Domain/VO/Gender.vo';
import { NutritionFinder } from '../Domain/Services/NutritionFinder';

export class CreateNutritionHandler implements IHandler<void> {
  constructor(private repository: INutritionRepository) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(command: CreateNutritionCommand): Promise<void> {
    const userId = new ID(command.userId);
    const gender = new Gender(command.gender);

    // Check if nutrition has been created or not
    // const existingNutrition = await this.repository.findByUserId(userId.value);

    // if(existingNutrition) {
    //   throw new Error();
    // }

    const nutrition = Nutrition.build(
      userId,
      command.weight,
      command.height,
      command.age,
      gender
    );

    const a = await this.repository.findOne(
      '29632813-c458-4a62-bbc0-b11912132510'
    );
    console.log(a);

    //await this.repository.save(nutrition);
  }
}
