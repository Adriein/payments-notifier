import { IHandler } from '../../../Domain/Interfaces';
import { CreateDietHandler } from '../../../Nutrition/Application/CreateDietHandler';
import { CreateNutritionHandler } from '../../../Nutrition/Application/CreateNutritionHandler';
import { GetDietsHandler } from '../../../Nutrition/Application/GetDietsHandler';
import { ModifyDietHandler } from '../../../Nutrition/Application/ModifyDietHandler';
import { GetDietsQuery } from '../../../Nutrition/Domain/Commands/GetDietsQuery';
import { NutritionFinder } from '../../../Nutrition/Domain/Services/NutritionFinder';
import { NutritionRepository } from '../../../Nutrition/Infrastructure/Data/NutritionRepository';
import { ConstructorFunc } from '../../Domain/types';

export default class HandlerFactory {
  private handlers: Map<string, IHandler<any>> = new Map();
  private nutritionRepository: NutritionRepository = new NutritionRepository();
  private finder: NutritionFinder = new NutritionFinder(
    this.nutritionRepository
  );

  constructor() {
    this.register();
  }

  public create<T, R>(_handler: ConstructorFunc<T>): IHandler<R> {
    const handler = this.handlers.get(_handler.name);

    if (!handler) {
      throw new Error();
    }

    return handler;
  }

  private register() {
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
      new CreateDietHandler(this.nutritionRepository, this.finder)
    );

    this.handlers.set(
      ModifyDietHandler.name,
      new ModifyDietHandler(this.nutritionRepository, this.finder)
    );
  }
}
