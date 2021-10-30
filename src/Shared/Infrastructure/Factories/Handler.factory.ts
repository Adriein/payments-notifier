import { IHandler } from '../../../Domain/Interfaces';
import { CreateDietHandler } from '../../../Diet/Application/CreateDietHandler';
import { CreateNutritionHandler } from '../../../Nutrition/Application/CreateNutritionHandler';
import { NutritionRepository } from '../../../Nutrition/Infrastructure/Data/NutritionRepository';
import { ConstructorFunc } from '../../Domain/types';
import { GetDietsHandler } from '../../../Diet/Application/GetDietsHandler';
import { ModifyDietHandler } from '../../../Diet/Application/ModifyDietHandler';
import { DietRepository } from '../../../Diet/Infrastructure/Data/DietRepository';
import { QueryBus } from '../Bus/QueryBus';
import { Nutrition } from '../../../Nutrition/Domain/Nutrition.entity';
import { KcalCalculator } from '../../../Nutrition/Domain/KcalCalculator';
import { SearchFoodHandler } from '../../../Food/Application/SearchFoodHandler';
import { FoodRepository } from '../../../Food/Infrastructure/Data/FoodRepository';
import { NutritionixRepository } from '../../../Food/Infrastructure/Data/NutritionixRepository';
import { AuthRepository } from "../../../Auth/Infrastructure/Data/AuthRepository";
import { SignInHandler } from "../../../Auth/Application/SignInHandler";
import { CryptoService } from "../../Domain/Services/CryptoService";
import { RegisterAdminHandler } from "../../../Auth/Application/RegisterAdminHandler";
import { FindPricingHandler } from "../../../Pricing/Application/FindPricingHandler";
import { PricingRepository } from "../../../Pricing/Infraestructure/Data/PricingRepository";
import { CreateUserHandler } from "../../../Users/Application/CreateUserHandler";
import { UserRepository } from "../../../Users/Infrastructure/Data/UserRepository";

export default class HandlerFactory {
  private handlers: Map<string, IHandler<any>> = new Map();

  private authRepository: AuthRepository = new AuthRepository();
  private nutritionRepository: NutritionRepository = new NutritionRepository();
  private dietRepository: DietRepository = new DietRepository();
  private foodRepository: FoodRepository = new FoodRepository();
  private nutritionixRepository: NutritionixRepository = new NutritionixRepository();
  private cryptoService: CryptoService = new CryptoService();
  private pricingRepository: PricingRepository = new PricingRepository();
  private userRepository: UserRepository = new UserRepository();

  constructor() {
    this.register();
  }

  public create<T, R>(_handler: ConstructorFunc<T>): IHandler<R> {
    const handler = this.handlers.get(_handler.name);

    if (!handler) {
      throw new Error('No handler with this name');
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
      new CreateDietHandler(
        QueryBus.instance<Nutrition>(),
        this.dietRepository,
        new KcalCalculator()
      )
    );

    this.handlers.set(
      ModifyDietHandler.name,
      new ModifyDietHandler(this.dietRepository)
    );

    this.handlers.set(
      SearchFoodHandler.name,
      new SearchFoodHandler(this.foodRepository, this.nutritionixRepository)
    );

    this.handlers.set(
      SignInHandler.name,
      new SignInHandler(this.authRepository, this.cryptoService)
    );

    this.handlers.set(
      RegisterAdminHandler.name,
      new RegisterAdminHandler()
    );

    this.handlers.set(
      FindPricingHandler.name,
      new FindPricingHandler(this.pricingRepository)
    );

    this.handlers.set(
      CreateUserHandler.name,
      new CreateUserHandler(this.userRepository)
    );
  }

  public getContainer(): Map<string, IHandler<any>> {
    return this.handlers;
  }
}
