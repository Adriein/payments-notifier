import { Log } from '../../../../Shared/Domain/Decorators/Log';
import { INutritionRepository } from '../../Domain/INutritionRepository';
import { Nutrition } from '../../Domain/Nutrition.entity';
import { ID } from '../../../../Shared/Domain/VO/Id.vo';
import { CreateNutritionCommand } from '../../Domain/Commands/CreateNutritionCommand';
import { Gender } from '../../Domain/VO/Gender.vo';
import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { CommandHandler } from "../../../../Shared/Domain/Decorators/CommandHandler.decorator";

@CommandHandler(CreateNutritionCommand)
export class CreateNutritionHandler implements IHandler<void> {
  constructor(private repository: INutritionRepository) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(command: CreateNutritionCommand): Promise<void> {
    const userId = new ID(command.userId);
    const gender = new Gender(command.gender);

    const result = await this.repository.findByUserId(userId.value);

    if (result.isLeft()) {
      throw result.value;
    }

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
