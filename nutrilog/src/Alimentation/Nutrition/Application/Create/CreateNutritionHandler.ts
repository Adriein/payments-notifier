import { Log } from '../../../../Shared/Domain/Decorators/Log';
import { INutritionRepository } from '../../Domain/INutritionRepository';
import { Nutrition } from '../../Domain/Nutrition.entity';
import { ID } from '../../../../Shared/Domain/VO/Id.vo';
import { CreateNutritionCommand } from '../../Domain/Commands/CreateNutritionCommand';
import { Gender } from '../../Domain/VO/Gender.vo';
import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { CommandHandler } from "../../../../Shared/Domain/Decorators/CommandHandler.decorator";
import { NutritionAlreadyExists } from "../../Domain/NutritionAlreadyExists";

@CommandHandler(CreateNutritionCommand)
export class CreateNutritionHandler implements IHandler<void> {
  constructor(private repository: INutritionRepository) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(command: CreateNutritionCommand): Promise<void> {
    const userId = new ID(command.userId);
    const adminId = new ID(command.adminId);
    const gender = new Gender(command.gender);

    const result = await this.repository.findByUserId(userId.value);

    if (result.isRight()) {
      throw new NutritionAlreadyExists(`User with id: ${userId.value} already has a nutrition`);
    }

    const nutrition = Nutrition.build(
        userId,
        adminId,
        command.weight,
        command.height,
        command.age,
        gender
      )
    ;

    await this.repository.save(nutrition);
  }
}
