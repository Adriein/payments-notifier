import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { GenerateExpiredSubscriptionsReportQuery } from "../../Domain/Query/GenerateExpiredSubscriptionsReportQuery";
import { QueryHandler } from "../../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { IUserRepository } from "../../Domain/IUserRepository";
import { UserCollection } from "../../Domain/Entity/UserCollection.entity";
import { SendExpiredSubscriptionsReportEmailDomainEvent } from "../../../Notifications/Domain/DomainEvents/SendExpiredSubscriptionsReportEmailDomainEvent";
import { IQueryBus } from "../../../../Shared/Domain/Bus/IQueryBus";
import { AppConfigResponse } from "../../../AppConfig/Application/Find/AppConfigResponse";
import { GetAppConfigQuery } from "../../../AppConfig/Domain/Query/GetAppConfigQuery";
import { User } from "../../Domain/Entity/User.entity";
import { DomainEventsManager } from "../../../../Shared/Domain/Entities/DomainEventsManager";
import { GetAllPricingQuery } from "../../../Pricing/Domain/Query/GetAllPricingQuery";
import { PricingResponse } from "../../../Pricing/Application/Find/PricingResponse";
import { GetUserResponse } from "../Find/GetUserResponse";
import { UserResponseBuilder } from "../Service/UserResponseBuilder";
import { UserWithoutPricingError } from "../../Domain/UserWithoutPricingError";

@QueryHandler(GenerateExpiredSubscriptionsReportQuery)
export class GenerateExpiredSubscriptionsReportHandler implements IHandler<void> {
  constructor(
    private readonly repository: IUserRepository,
    private readonly pricingQueryBus: IQueryBus<PricingResponse[]>,
    private readonly appConfigQueryBus: IQueryBus<AppConfigResponse>,
    private readonly builder: UserResponseBuilder
  ) {}

  public async handle(command: GenerateExpiredSubscriptionsReportQuery): Promise<void> {
    const result = await this.repository.findAdmins();

    if (result.isLeft()) {
      throw result.value;
    }

    const admins = result.value;

    for (const admin of admins) {
      const appConfig = await this.appConfigQueryBus.ask(new GetAppConfigQuery(admin.id()));

      const pricing = await this.pricingQueryBus.ask(new GetAllPricingQuery(admin.id()));

      const queryResult = await this.repository.findUsersWithExpiredSubscriptions(admin.id());

      if (queryResult.isLeft()) {
        continue;
      }

      const result = queryResult.value;

      const users = new UserCollection(result);

      const totalDefaulters = users.totalDefaulters();

      const event = this.createEvent(admin, users, totalDefaulters, appConfig.lastSentReport, pricing);

      admin.addEvent(event);
      await DomainEventsManager.publishEvents(admin.id());
    }
  }

  private createEvent(
    admin: User,
    collection: UserCollection,
    totalDefaulters: number,
    lastReportDate: Date,
    pricing: PricingResponse[]
  ): SendExpiredSubscriptionsReportEmailDomainEvent {
    const pricingMap = this.buildPricingMap(pricing);
    const defaulters = this.buildDefaulterQueryPart(collection.defaulters(), pricing);
    const oldDefaulters = this.buildDefaulterQueryPart(collection.longTermDefaulters(pricingMap), pricing);

    return new SendExpiredSubscriptionsReportEmailDomainEvent(
      admin.id(),
      totalDefaulters,
      lastReportDate,
      new Date(),
      defaulters,
      oldDefaulters
    );
  }

  private buildPricingMap(pricingList: PricingResponse[]): Map<string, number> {
    const result = new Map<string, number>();

    for (const pricing of pricingList) {
      result.set(pricing.id, pricing.duration);
    }

    return result;
  }

  private buildDefaulterQueryPart(users: User[], pricingList: PricingResponse[]): GetUserResponse[] {
    return users.map((user: User) => {
      const pricing = pricingList.find((pricing: PricingResponse) => pricing.id === user.pricingId());

      if (!pricing) {
        throw new UserWithoutPricingError(user.name(), user.id());
      }

      return this.builder.run(user, pricing)
    });
  }
}