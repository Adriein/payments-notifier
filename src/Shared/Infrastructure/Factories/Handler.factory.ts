import { IHandler } from '../../../Domain/Interfaces';
import { CreateDietHandler } from '../../../Nutrition/Application/CreateDietHandler';
import { CreateNutritionHandler } from '../../../Nutrition/Application/CreateNutritionHandler';
import { GetDietsHandler } from '../../../Nutrition/Application/GetDietsHandler';
import { GetDietsQuery } from '../../../Nutrition/Domain/Commands/GetDietsQuery';
import { NutritionRepository } from '../../../Nutrition/Infrastructure/Data/NutritionRepository';
import { ConstructorFunc } from '../../Domain/types';

export default class HandlerFactory {
  private handlers: Map<string, IHandler<any>> = new Map();
  private nutritionRepository: NutritionRepository = new NutritionRepository();

  constructor() {
    this.bindHandlers();
  }

  public create<T, R>(_handler: ConstructorFunc<T>): IHandler<R> {
    const handler = this.handlers.get(_handler.name);

    if (!handler) {
      throw new Error();
    }

    return handler;
  }

  private bindHandlers() {
    this.handlers.set(
      CreateNutritionHandler.name,
      new CreateNutritionHandler(this.nutritionRepository)
    );

    this.handlers.set(
      GetDietsHandler.name,
      new GetDietsHandler(this.nutritionRepository)
    );

    this.handlers.set(
      CreateDietHandler.name,
      new CreateDietHandler(this.nutritionRepository)
    );
  }
}
