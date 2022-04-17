import { ConstructorFunc } from '../../Domain/types';
import { QueryBus } from '../Bus/QueryBus';
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
import { GetClientProfileHandler } from "../../../Backoffice/User/Application/GetClientProfile/GetClientProfileHandler";
import { SubscriptionRepository } from "../../../Backoffice/User/Infrastructure/Data/SubscriptionRepository";
import { UserFinder } from "../../../Backoffice/User/Application/Service/UserFinder";
import { TenantRepository } from "../../../Backoffice/User/Infrastructure/Data/TenantRepository";
import { ClientRepository } from "../../../Backoffice/User/Infrastructure/Data/ClientRepository";
import { ClientFinder } from "../../../Backoffice/User/Application/Service/ClientFinder";
import { GetTotalClientsQuery } from "../../../Backoffice/User/Application/GetTotalClients/GetTotalClientsQuery";
import { GetTotalClientsHandler } from "../../../Backoffice/User/Application/GetTotalClients/GetTotalClientsHandler";
import { GetClientProfileQuery } from "../../../Backoffice/User/Application/GetClientProfile/GetClientProfileQuery";
import { FindTenantClientsQuery } from "../../../Backoffice/User/Application/FindTenantClients/FindTenantClientsQuery";
import { SigninQuery } from "../../../Auth/Domain/Query/SigninQuery";
import { AppFilterRepository } from "../../../Backoffice/Filters/Infrastructure/Data/AppFilterRepository";
import { FindFiltersQuery } from "../../../Backoffice/Filters/Application/FindFilters/FindFiltersQuery";
import { FindFiltersHandler } from "../../../Backoffice/Filters/Application/FindFilters/FindFiltersHandler";
import { GetPricingDistinctValuesQuery } from "../../../Backoffice/Pricing/Application/GetPricingDistinctValues/GetPricingDistinctValuesQuery";
import { GetPricingDistinctValuesHandler } from "../../../Backoffice/Pricing/Application/GetPricingDistinctValues/GetPricingDistinctValuesHandler";
import { PrismaClientFilter } from "../../../Backoffice/User/Infrastructure/Data/PrismaClientFilter";
import { PrismaQueryBuilder } from "../Data/PrismaQueryBuilder";

export default class QueryHandlerFactory {
  private handlers: Map<string, IHandler<any>> = new Map();

  private authRepository: AuthRepository = new AuthRepository();
  private pricingRepository: PricingRepository = new PricingRepository();
  private userRepository: UserRepository = new UserRepository();
  private subscriptionRepository: SubscriptionRepository = new SubscriptionRepository();
  private roleRepository: RoleRepository = new RoleRepository();
  private tenantRepository = new TenantRepository();
  private clientRepository = new ClientRepository();
  private appFiltersRepository = new AppFilterRepository();

  private cryptoService: CryptoService = new CryptoService();

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
    //Auth BC

    this.handlers.set(
      SigninQuery.name,
      new SignInHandler(this.authRepository, this.cryptoService)
    );

    //BackOffice BC
    //User

    this.handlers.set(
      GetClientProfileQuery.name,
      new GetClientProfileHandler(
        this.clientFinder,
        this.subscriptionRepository,
        QueryBus.instance()
      )
    );

    this.handlers.set(
      FindTenantClientsQuery.name,
      new FindTenantClientsHandler(
        this.clientRepository,
        this.subscriptionRepository,
        new PrismaClientFilter(new PrismaQueryBuilder()),
        QueryBus.instance()
      )
    );

    this.handlers.set(
      GetTotalClientsQuery.name,
      new GetTotalClientsHandler(this.userRepository)
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

    this.handlers.set(
      GetPricingDistinctValuesQuery.name,
      new GetPricingDistinctValuesHandler(this.pricingRepository)
    );

    //Filters

    this.handlers.set(
      FindFiltersQuery.name,
      new FindFiltersHandler(this.appFiltersRepository, QueryBus.instance())
    )

  }

  public getContainer(): Map<string, IHandler<any>> {
    return this.handlers;
  }
}
