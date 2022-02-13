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
import { CreateUserHandler } from "../../../Backoffice/User/Application/Create/CreateUserHandler";
import { UpdatePaymentHandler } from "../../../Backoffice/User/Application/Update/UpdatePaymentHandler";
import { DeleteUserHandler } from "../../../Backoffice/User/Application/Delete/DeleteUserHandler";
import { CreatePricingHandler } from "../../../Backoffice/Pricing/Application/Create/CreatePricingHandler";
import { UserFinder } from "../../../Backoffice/User/Application/Service/UserFinder";
import { SubscriptionRepository } from "../../../Backoffice/User/Infrastructure/Data/SubscriptionRepository";

export default class CommandHandlerFactory {
  private handlers: Map<string, IHandler<any>> = new Map();

  private nutritionRepository: NutritionRepository = new NutritionRepository();
  private dietRepository: DietRepository = new DietRepository();
  private pricingRepository: PricingRepository = new PricingRepository();
  private userRepository: UserRepository = new UserRepository();
  private subscriptionRepository: SubscriptionRepository = new SubscriptionRepository();
  private cryptoService: CryptoService = new CryptoService();

  private userFinder = new UserFinder(this.userRepository);


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
      CreateUserHandler.name,
      new CreateUserHandler(this.userRepository, this.subscriptionRepository, QueryBus.instance(), this.cryptoService)
    );

    this.handlers.set(
      UpdatePaymentHandler.name,
      new UpdatePaymentHandler(this.userFinder, this.subscriptionRepository)
    );

    this.handlers.set(
      DeleteUserHandler.name,
      new DeleteUserHandler(this.userRepository)
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