import { CreateDietHandler } from '../../../Alimentation/Diet/Application/CreateDietHandler';
import { CreateNutritionHandler } from '../../../Alimentation/Nutrition/Application/Create/CreateNutritionHandler';
import { NutritionRepository } from '../../../Alimentation/Nutrition/Infrastructure/Data/NutritionRepository';
import { ConstructorFunc } from '../../Domain/types';
import { GetDietsHandler } from '../../../Alimentation/Diet/Application/GetDietsHandler';
import { ModifyDietHandler } from '../../../Alimentation/Diet/Application/ModifyDietHandler';
import { DietRepository } from '../../../Alimentation/Diet/Infrastructure/Data/DietRepository';
import { QueryBus } from '../Bus/QueryBus';
import { KcalCalculator } from '../../../Alimentation/Nutrition/Domain/KcalCalculator';
import { SearchFoodHandler } from '../../../Alimentation/Food/Application/SearchFoodHandler';
import { FoodRepository } from '../../../Alimentation/Food/Infrastructure/Data/FoodRepository';
import { NutritionixRepository } from '../../../Alimentation/Food/Infrastructure/Data/NutritionixRepository';
import { AuthRepository } from "../../../Auth/Infrastructure/Data/AuthRepository";
import { SignInHandler } from "../../../Auth/Application/SignInHandler";
import { CryptoService } from "../../Domain/Services/CryptoService";
import { RegisterAdminHandler } from "../../../Auth/Application/RegisterAdminHandler";
import { PricingRepository } from "../../../Backoffice/Pricing/Infraestructure/Data/PricingRepository";
import { UserRepository } from "../../../Backoffice/Users/Infrastructure/Data/UserRepository";
import { UpdateUserHandler } from "../../../Backoffice/Users/Application/Update/UpdateUserHandler";
import { UpdatePaymentHandler } from "../../../Backoffice/Users/Application/Update/UpdatePaymentHandler";
import { GetPricingHandler } from "../../../Backoffice/Pricing/Application/Find/GetPricingHandler";
import { GetAllUsersHandler } from "../../../Backoffice/Users/Application/Find/GetAllUsersHandler";
import { SearchRoleHandler } from "../../../Backoffice/Role/Application/SearchRoleHandler";
import { RoleRepository } from "../../../Backoffice/Role/Infrastructure/RoleRepository";
import { SearchPricingHandler } from "../../../Backoffice/Pricing/Application/Find/SearchPricingHandler";
import { CreateUserHandler } from "../../../Backoffice/Users/Application/Create/CreateUserHandler";
import { DeleteUserHandler } from "../../../Backoffice/Users/Application/Delete/DeleteUserHandler";
import { IHandler } from "../../Domain/Interfaces/IHandler";
import { FindNutritionHandler } from "../../../Alimentation/Nutrition/Application/Find/FindNutritionHandler";
import { NutritionResponseBuilder } from "../../../Alimentation/Nutrition/Application/Services/NutritionResponseBuilder";
import { GetUserHandler } from "../../../Backoffice/Users/Application/Find/GetUserHandler";
import { GetNutritionHandler } from "../../../Alimentation/Nutrition/Application/Find/GetNutritionHandler";

export default class QueryHandlerFactory {
  private handlers: Map<string, IHandler<any>> = new Map();

  private authRepository: AuthRepository = new AuthRepository();
  private dietRepository: DietRepository = new DietRepository();
  private foodRepository: FoodRepository = new FoodRepository();
  private nutritionixRepository: NutritionixRepository = new NutritionixRepository();
  private cryptoService: CryptoService = new CryptoService();
  private pricingRepository: PricingRepository = new PricingRepository();
  private userRepository: UserRepository = new UserRepository();
  private roleRepository: RoleRepository = new RoleRepository();
  private nutritionRepository: NutritionRepository = new NutritionRepository();
  private nutritionBuilder = new NutritionResponseBuilder();

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
    //Alimentation BC
    //Nutrition

    this.handlers.set(
      FindNutritionHandler.name,
      new FindNutritionHandler(this.nutritionRepository, QueryBus.instance(), this.nutritionBuilder)
    );

    this.handlers.set(
      GetNutritionHandler.name,
      new GetNutritionHandler(this.nutritionRepository, QueryBus.instance(), this.nutritionBuilder)
    );

    this.handlers.set(
      GetDietsHandler.name,
      new GetDietsHandler(this.dietRepository)
    );


    this.handlers.set(
      SearchFoodHandler.name,
      new SearchFoodHandler(this.foodRepository, this.nutritionixRepository)
    );

    //Auth BC

    this.handlers.set(
      SignInHandler.name,
      new SignInHandler(this.authRepository, this.cryptoService)
    );

    //BackOffice BC
    //Users

    this.handlers.set(
      GetUserHandler.name,
      new GetUserHandler(this.userRepository, QueryBus.instance())
    );

    this.handlers.set(
      GetAllUsersHandler.name,
      new GetAllUsersHandler(this.userRepository, QueryBus.instance())
    );

    //Role

    this.handlers.set(
      SearchRoleHandler.name,
      new SearchRoleHandler(this.roleRepository)
    );

    //Pricing

    this.handlers.set(
      GetPricingHandler.name,
      new GetPricingHandler(this.pricingRepository)
    );

    this.handlers.set(
      SearchPricingHandler.name,
      new SearchPricingHandler(this.pricingRepository)
    );

  }

  public getContainer(): Map<string, IHandler<any>> {
    return this.handlers;
  }
}
