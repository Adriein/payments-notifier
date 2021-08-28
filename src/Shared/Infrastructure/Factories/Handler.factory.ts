import { IHandler } from '../../../Domain/Interfaces';
import { CreateDietHandler } from '../../../Diet/Application/CreateDietHandler';
import { CreateNutritionHandler } from '../../../Nutrition/Application/CreateNutritionHandler';
import { NutritionFinder } from '../../../Nutrition/Domain/Services/NutritionFinder';
import { NutritionRepository } from '../../../Nutrition/Infrastructure/Data/NutritionRepository';
import { ConstructorFunc } from '../../Domain/types';
import { GetDietsHandler } from '../../../Diet/Application/GetDietsHandler';
import { ModifyDietHandler } from '../../../Diet/Application/ModifyDietHandler';
import { DietRepository } from '../../../Diet/Infrastructure/Data/DietRepository';
import { GetUserQuery } from '../../../Users/Domain/Query/GetUserQuery';
import { GetUserHandler } from '../../../Users/Application/GetUserHandler';
import { UserRepository } from '../../../Infraestructure/Data/Repositories/UserRepository';

export default class HandlerFactory {
  private handlers: Map<string, IHandler<any>> = new Map();
  private nutritionRepository: NutritionRepository = new NutritionRepository();
  private dietRepository: DietRepository = new DietRepository();
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
      new GetDietsHandler(this.dietRepository)
    );

    this.handlers.set(
      CreateDietHandler.name,
      new CreateDietHandler(this.dietRepository)
    );

    this.handlers.set(
      ModifyDietHandler.name,
      new ModifyDietHandler(this.dietRepository)
    );

    // this.handlers.set(
    //   GetUserQuery.name,
    //   new GetUserHandler(this.userRepository)
    // );
  }
}
