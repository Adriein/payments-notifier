import { NutritionRepository } from '../../../Alimentation/Nutrition/Infrastructure/Data/NutritionRepository';
import { ConstructorFunc } from '../../Domain/types';
import { GetDietsHandler } from '../../../Alimentation/Diet/Application/Find/GetDietsHandler';
import { DietRepository } from '../../../Alimentation/Diet/Infrastructure/Data/DietRepository';
import { QueryBus } from '../Bus/QueryBus';
import { SearchFoodHandler } from '../../../Alimentation/Food/Application/SearchFoodHandler';
import { FoodRepository } from '../../../Alimentation/Food/Infrastructure/Data/FoodRepository';
import { NutritionixRepository } from '../../../Alimentation/Food/Infrastructure/Data/NutritionixRepository';
import { AuthRepository } from "../../../Auth/Infrastructure/Data/AuthRepository";
import { SignInHandler } from "../../../Auth/Application/SignInHandler";
import { CryptoService } from "../../Domain/Services/CryptoService";
import { PricingRepository } from "../../../Backoffice/Pricing/Infraestructure/Data/PricingRepository";
import { UserRepository } from "../../../Backoffice/User/Infrastructure/Data/UserRepository";
import { GetPricingHandler } from "../../../Backoffice/Pricing/Application/Find/GetPricingHandler";
import { FindTenantClientsHandler } from "../../../Backoffice/User/Application/FindTenantClients/FindTenantClientsHandler";
import { SearchRoleHandler } from "../../../Backoffice/Role/Application/SearchRoleHandler";
import { RoleRepository } from "../../../Backoffice/Role/Infrastructure/RoleRepository";
import { SearchPricingHandler } from "../../../Backoffice/Pricing/Application/Find/SearchPricingHandler";
import { IHandler } from "../../Domain/Interfaces/IHandler";
import { FindNutritionHandler } from "../../../Alimentation/Nutrition/Application/Find/FindNutritionHandler";
import { NutritionResponseBuilder } from "../../../Alimentation/Nutrition/Application/Services/NutritionResponseBuilder";
import { GetClientProfileHandler } from "../../../Backoffice/User/Application/GetClientProfile/GetClientProfileHandler";
import { GetNutritionHandler } from "../../../Alimentation/Nutrition/Application/Find/GetNutritionHandler";
import { GetDietResponseBuilder } from "../../../Alimentation/Diet/Application/Services/GetDietResponseBuilder";
import { SubscriptionRepository } from "../../../Backoffice/User/Infrastructure/Data/SubscriptionRepository";
import { UserFinder } from "../../../Backoffice/User/Application/Service/UserFinder";
import { TenantRepository } from "../../../Backoffice/User/Infrastructure/Data/TenantRepository";
import { ClientRepository } from "../../../Backoffice/User/Infrastructure/Data/ClientRepository";
import { ClientFinder } from "../../../Backoffice/User/Application/Service/ClientFinder";

export default class QueryHandlerFactory {
  private handlers: Map<string, IHandler<any>> = new Map();

  private authRepository: AuthRepository = new AuthRepository();
  private dietRepository: DietRepository = new DietRepository();
  private foodRepository: FoodRepository = new FoodRepository();
  private nutritionixRepository: NutritionixRepository = new NutritionixRepository();
  private pricingRepository: PricingRepository = new PricingRepository();
  private userRepository: UserRepository = new UserRepository();
  private subscriptionRepository: SubscriptionRepository = new SubscriptionRepository();
  private roleRepository: RoleRepository = new RoleRepository();
  private nutritionRepository: NutritionRepository = new NutritionRepository();
  private tenantRepository = new TenantRepository();
  private clientRepository = new ClientRepository();

  private cryptoService: CryptoService = new CryptoService();
  private nutritionBuilder = new NutritionResponseBuilder();

  private userFinder = new UserFinder(this.userRepository);
  private clientFinder = new ClientFinder(this.clientRepository);


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
      new GetDietsHandler(this.dietRepository, new GetDietResponseBuilder())
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
    //User

    this.handlers.set(
      GetClientProfileHandler.name,
      new GetClientProfileHandler(
        this.clientFinder,
        this.subscriptionRepository,
        QueryBus.instance()
      )
    );

    this.handlers.set(
      FindTenantClientsHandler.name,
      new FindTenantClientsHandler(this.clientRepository, this.subscriptionRepository, QueryBus.instance())
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
