import { Log } from '../../../Shared/Domain/Decorators/Log';
import { ID } from '../../../Shared/Domain/VO/Id.vo';
import { CreateDietCommand } from '../Domain/Command/CreateDietCommand';
import { DietType } from '../Domain/VO/DietType.vo';
import { IDietRepository } from '../Domain/IDietRepository';
import { Diet } from '../Domain/Diet.entity';
import { IQueryBus } from '../../../Shared/Domain/Bus/IQueryBus';
import { CommandHandler } from "../../../Shared/Domain/Decorators/CommandHandler.decorator";
import { IHandler } from "../../../Shared/Domain/Interfaces/IHandler";
import { GetNutritionQuery } from "../../Nutrition/Domain/Query/GetNutritionQuery";
import { GetNutritionResponse } from "../../Nutrition/Application/Find/GetNutritionResponse";

@CommandHandler(CreateDietCommand)
export class CreateDietHandler implements IHandler<void> {
  constructor(
    private queryBus: IQueryBus<GetNutritionResponse>,
    private repository: IDietRepository
  ) {
  }

  @Log(process.env.LOG_LEVEL)
  public async handle(command: CreateDietCommand): Promise<void> {
    const nutritionId = new ID(command.nutritionId);
    const objective = new DietType(command.objective);

    const nutrition = await this.queryBus.ask(
      new GetNutritionQuery(nutritionId.value)
    );

    const kcal = this.calcKcal(
      nutrition,
      command.lastDietKcal,
      command.newKcal
    );

    const diet = new Diet(
      ID.generate(),
      command.name,
      nutritionId,
      objective,
      kcal
    );

    await this.repository.save(diet);
  }

  private calcKcal(
    nutrition: Nutrition,
    kcal?: number,
    change?: number
  ): number {
    if (change && kcal) {
      return kcal + change;
    }
    const calcKcal = this.kcalCalc.calculate(nutrition);

    if (change) {
      return calcKcal + change;
    }

    return kcal ? kcal : calcKcal;
  }
}
