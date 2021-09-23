import { Log } from '../../Domain/Decorators/Log';
import { IHandler } from '../../Domain/Interfaces';
import { ID } from '../../Domain/VO/Id.vo';
import { ModifyDietCommand } from '../Domain/Command/ModifyDietCommand';
import { IDietRepository } from '../Domain/IDietRepository';
import { CommandHandler } from "../../Shared/Domain/Decorators/CommandHandler.decorator";

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


    const diet = await this.repository.findOne(dietId.value);

    if (!diet) {
      throw new Error('Not diet found');
    }

    diet.flush();

    command.meals.forEach((meal) => {
      diet.add(meal.name, meal.foods);
    });

    await this.repository.update(diet);
  }
}
