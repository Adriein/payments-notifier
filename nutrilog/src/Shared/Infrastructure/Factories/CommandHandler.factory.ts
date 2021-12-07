import { IHandler } from "../../Domain/Interfaces/IHandler";
import { ConstructorFunc } from "../../Domain/types";
import { AuthRepository } from "../../../Auth/Infrastructure/Data/AuthRepository";
import { NutritionRepository } from "../../../Alimentation/Nutrition/Infrastructure/Data/NutritionRepository";
import { DietRepository } from "../../../Alimentation/Diet/Infrastructure/Data/DietRepository";
import { FoodRepository } from "../../../Alimentation/Food/Infrastructure/Data/FoodRepository";
import { NutritionixRepository } from "../../../Alimentation/Food/Infrastructure/Data/NutritionixRepository";
import { CryptoService } from "../../Domain/Services/CryptoService";
import { PricingRepository } from "../../../Backoffice/Pricing/Infraestructure/Data/PricingRepository";
import { UserRepository } from "../../../Backoffice/Users/Infrastructure/Data/UserRepository";
import { RoleRepository } from "../../../Backoffice/Role/Infrastructure/RoleRepository";
import { CreateNutritionHandler } from "../../../Alimentation/Nutrition/Application/Create/CreateNutritionHandler";
import { CreateDietHandler } from "../../../Alimentation/Diet/Application/CreateDietHandler";
import { QueryBus } from "../Bus/QueryBus";
import { KcalCalculator } from "../../../Alimentation/Nutrition/Domain/KcalCalculator";
import { ModifyDietHandler } from "../../../Alimentation/Diet/Application/ModifyDietHandler";
import { RegisterAdminHandler } from "../../../Auth/Application/RegisterAdminHandler";
import { CreateUserHandler } from "../../../Backoffice/Users/Application/Create/CreateUserHandler";
import { UpdateUserHandler } from "../../../Backoffice/Users/Application/Update/UpdateUserHandler";
import { UpdatePaymentHandler } from "../../../Backoffice/Users/Application/Update/UpdatePaymentHandler";
import { DeleteUserHandler } from "../../../Backoffice/Users/Application/Delete/DeleteUserHandler";
import { CreatePricingHandler } from "../../../Backoffice/Pricing/Application/Create/CreatePricingHandler";

export default class CommandHandlerFactory {
  private handlers: Map<string, IHandler<any>> = new Map();

  private nutritionRepository: NutritionRepository = new NutritionRepository();
  private dietRepository: DietRepository = new DietRepository();
  private pricingRepository: PricingRepository = new PricingRepository();
  private userRepository: UserRepository = new UserRepository();
  private cryptoService: CryptoService = new CryptoService();


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
        QueryBus.instance(),
        this.dietRepository,
        new KcalCalculator()
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
      new CreateUserHandler(this.userRepository, QueryBus.instance(), this.cryptoService)
    );

    this.handlers.set(
      UpdateUserHandler.name,
      new UpdateUserHandler(this.userRepository)
    );

    this.handlers.set(
      UpdatePaymentHandler.name,
      new UpdatePaymentHandler(this.userRepository)
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