import { Log } from '../../../../Shared/Domain/Decorators/Log';
import { ID } from '../../../../Shared/Domain/VO/Id.vo';
import { ModifyDietCommand } from '../../Domain/Command/ModifyDietCommand';
import { IDietRepository } from '../../Domain/IDietRepository';
import { CommandHandler } from "../../../../Shared/Domain/Decorators/CommandHandler.decorator";
import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";

@CommandHandler(ModifyDietCommand)
export class ModifyDietHandler implements IHandler<void> {
  constructor(
    private repository: IDietRepository,
  ) {
  }

  @Log(process.env.LOG_LEVEL)
  public async handle(command: ModifyDietCommand): Promise<void> {
    const nutritionId = new ID(command.nutritionId);
    const dietId = new ID(command.dietId);


    const result = await this.repository.findOne(dietId.value);

    if (result.isLeft()) {
      throw new Error('Not diet found');
    }

    const diet = result.value;

    diet.flush();

    command.meals.forEach((meal) => {
      diet.add(meal.name, meal.foods);
    });

    await this.repository.update(diet);
  }
}
