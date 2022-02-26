import { IHandler } from "../../Domain/Interfaces/IHandler";
import { ConstructorFunc } from "../../Domain/types";
import { NutritionRepository } from "../../../Alimentation/Nutrition/Infrastructure/Data/NutritionRepository";
import { DietRepository } from "../../../Alimentation/Diet/Infrastructure/Data/DietRepository";
import { CryptoService } from "../../Domain/Services/CryptoService";
import { PricingRepository } from "../../../Backoffice/Pricing/Infraestructure/Data/PricingRepository";
import { UserRepository } from "../../../Backoffice/User/Infrastructure/Data/UserRepository";
import { CreateNutritionHandler } from "../../../Alimentation/Nutrition/Application/Create/CreateNutritionHandler";
import { CreateDietHandler } from "../../../Alimentation/Diet/Application/Create/CreateDietHandler";
import { QueryBus } from "../Bus/QueryBus";
import { ModifyDietHandler } from "../../../Alimentation/Diet/Application/Update/ModifyDietHandler";
import { RegisterAdminHandler } from "../../../Auth/Application/RegisterAdminHandler";
import { CreateClientHandler } from "../../../Backoffice/User/Application/CreateClient/CreateClientHandler";
import { RenewSubscriptionHandler } from "../../../Backoffice/User/Application/RenewSubscription/RenewSubscriptionHandler";
import { DeactivateClientHandler } from "../../../Backoffice/User/Application/DeactivateClient/DeactivateClientHandler";
import { CreatePricingHandler } from "../../../Backoffice/Pricing/Application/Create/CreatePricingHandler";
import { UserFinder } from "../../../Backoffice/User/Application/Service/UserFinder";
import { SubscriptionRepository } from "../../../Backoffice/User/Infrastructure/Data/SubscriptionRepository";
import { TenantFinder } from "../../../Backoffice/User/Application/Service/TenantFinder";
import { ClientRepository } from "../../../Backoffice/User/Infrastructure/Data/ClientRepository";
import { TenantRepository } from "../../../Backoffice/User/Infrastructure/Data/TenantRepository";
import { CheckForAboutToExpireSubscriptionsCommand } from "../../../Backoffice/User/Application/CheckForAboutToExpireSubscriptions/CheckForAboutToExpireSubscriptionsCommand";
import { CheckForAboutToExpireSubscriptionsHandler } from "../../../Backoffice/User/Application/CheckForAboutToExpireSubscriptions/CheckForAboutToExpireSubscriptionsHandler";
import { TenantCollectionFinder } from "../../../Backoffice/User/Application/Service/TenantCollectionFinder";
import { CheckForExpiredSubscriptionsCommand } from "../../../Backoffice/User/Application/CheckForExpiredSubscriptions/CheckForExpiredSubscriptionsCommand";
import { CheckForExpiredSubscriptionsHandler } from "../../../Backoffice/User/Application/CheckForExpiredSubscriptions/CheckForExpiredSubscriptionsHandler";
import { GenerateExpiredSubscriptionsReportCommand } from "../../../Backoffice/User/Application/GenerateExpiredSubscriptionReport/GenerateExpiredSubscriptionsReportCommand";
import { GenerateExpiredSubscriptionsReportHandler } from "../../../Backoffice/User/Application/GenerateExpiredSubscriptionReport/GenerateExpiredSubscriptionsReportHandler";

export default class CommandHandlerFactory {
  private handlers: Map<string, IHandler<any>> = new Map();

  private nutritionRepository: NutritionRepository = new NutritionRepository();
  private dietRepository: DietRepository = new DietRepository();
  private pricingRepository: PricingRepository = new PricingRepository();
  private userRepository: UserRepository = new UserRepository();
  private subscriptionRepository: SubscriptionRepository = new SubscriptionRepository();
  private clientRepository = new ClientRepository();
  private tenantRepository = new TenantRepository();

  private userFinder = new UserFinder(this.userRepository);
  private tenantFinder = new TenantFinder(this.tenantRepository);
  private tenantCollectionFinder = new TenantCollectionFinder(this.userRepository, QueryBus.instance());


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
    this.handlers.set(
      CreateNutritionHandler.name,
      new CreateNutritionHandler(this.nutritionRepository)
    );

    this.handlers.set(
      CreateDietHandler.name,
      new CreateDietHandler(
        this.dietRepository
      )
    );

    this.handlers.set(
      ModifyDietHandler.name,
      new ModifyDietHandler(this.dietRepository)
    );

    //BackOffice BC
    //User Module
    this.handlers.set(
      RegisterAdminHandler.name,
      new RegisterAdminHandler()
    );

    this.handlers.set(
      CreateClientHandler.name,
      new CreateClientHandler(
        this.clientRepository,
        this.subscriptionRepository,
        QueryBus.instance(),
        this.tenantFinder
      )
    );

    this.handlers.set(
      CheckForAboutToExpireSubscriptionsCommand.name,
      new CheckForAboutToExpireSubscriptionsHandler(
        this.clientRepository,
        this.subscriptionRepository,
        this.tenantCollectionFinder,
        QueryBus.instance()
      )
    );

    this.handlers.set(
      CheckForExpiredSubscriptionsCommand.name,
      new CheckForExpiredSubscriptionsHandler(
        this.clientRepository,
        this.subscriptionRepository,
        this.tenantCollectionFinder,
        QueryBus.instance()
      )
    );

    this.handlers.set(
      GenerateExpiredSubscriptionsReportCommand.name,
      new GenerateExpiredSubscriptionsReportHandler(
        this.clientRepository,
        this.subscriptionRepository,
        this.tenantCollectionFinder
      )
    );

    this.handlers.set(
      RenewSubscriptionHandler.name,
      new RenewSubscriptionHandler(this.userFinder, this.subscriptionRepository)
    );

    this.handlers.set(
      DeactivateClientHandler.name,
      new DeactivateClientHandler(this.userRepository)
    );

    //Pricing Module

    this.handlers.set(
      CreatePricingHandler.name,
      new CreatePricingHandler(this.pricingRepository)
    )
  }

  public getContainer(): Map<string, IHandler<any>> {
    return this.handlers;
  }
}