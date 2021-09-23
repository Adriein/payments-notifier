import { IHandler } from "../../Domain/Interfaces";
import { CommandHandler } from "../../Shared/Domain/Decorators/CommandHandler.decorator";
import { SaveFoodCommand } from "../Domain/Command/SaveFoodCommand";
import { IFoodRepository } from "../Domain/IFoodRepository";
import { Food } from "../Domain/Food.entity";
import { ID } from "../../Domain/VO/Id.vo";
import { MicroNutrients } from "../Domain/MicroNutrients.entity";

@CommandHandler(SaveFoodCommand)
export class SaveFoodHandler implements IHandler<void> {
  constructor(private readonly repository: IFoodRepository) {
  }

  public async handle(command: SaveFoodCommand): Promise<void> {
    const foodOnDb = await this.repository.findOne(command.id);

    if (foodOnDb) {
      throw new Error('Food already exists in the db');
    }

    const micros = command.micro.map(micro => new MicroNutrients(micro.name, micro.amount));

    const food = new Food(
      new ID(command.id),
      command.name,
      command.unit,
      command.qty,
      command.photo,
      command.kcal,
      micros,
      new Date(command.dateCreated),
      new Date(command.dateUpdated)
    );

    await this.repository.save(food);
  }
}