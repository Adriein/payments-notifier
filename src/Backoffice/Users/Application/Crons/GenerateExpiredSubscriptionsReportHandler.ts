import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { GenerateExpiredSubscriptionsReportQuery } from "../../Domain/Query/GenerateExpiredSubscriptionsReportQuery";
import { QueryHandler } from "../../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { IUserRepository } from "../../Domain/IUserRepository";
import { UserCollection } from "../../Domain/UserCollection.entity";
import { SendExpiredSubscriptionsReportEmailDomainEvent } from "../../../Notifications/Domain/DomainEvents/SendExpiredSubscriptionsReportEmailDomainEvent";
import { IQueryBus } from "../../../../Shared/Domain/Bus/IQueryBus";
import { GetAppConfigDto } from "../../../AppConfig/Application/GetAppConfigDto";
import { GetAppConfigQuery } from "../../../AppConfig/Domain/GetAppConfigQuery";
import { User } from "../../Domain/User.entity";
import { DomainEventsManager } from "../../../../Shared/Domain/Entities/DomainEventsManager";
import { GetAllPricingQuery } from "../../../Pricing/Domain/GetAllPricingQuery";
import { PricingResponseDto } from "../../../Pricing/Application/PricingResponse.dto";

@QueryHandler(GenerateExpiredSubscriptionsReportQuery)
export class GenerateExpiredSubscriptionsReportHandler implements IHandler<void> {
  constructor(
    private readonly repository: IUserRepository,
    private queryBus: IQueryBus<GetAppConfigDto | PricingResponseDto[]>
  ) {}

  public async handle(command: GenerateExpiredSubscriptionsReportQuery): Promise<void> {
    const admins = await this.repository.findAdmins();

    for (const admin of admins) {
      const appConfig = await this.queryBus.ask<GetAppConfigDto>(new GetAppConfigQuery(admin.id()));

      const pricing = await this.queryBus.ask<PricingResponseDto[]>(new GetAllPricingQuery(admin.id()));

      const result = await this.repository.findUsersWithExpiredSubscriptions(admin.id());

      const users = new UserCollection(result);

      const totalDefaulters = users.defaulters().length;

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
    pricing: PricingResponseDto[]
  ): SendExpiredSubscriptionsReportEmailDomainEvent {
    const pricingMap = this.buildPricingMap(pricing);
    const defaulters = this.buildDefaulterQueryPart(collection.defaulters());
    const oldDefaulters = this.buildDefaulterQueryPart(collection.longTermDefaulters(pricingMap));

    return new SendExpiredSubscriptionsReportEmailDomainEvent(
      admin.id(),
      totalDefaulters,
      lastReportDate,
      new Date(),
      defaulters,
      oldDefaulters
    );
  }

  private buildPricingMap(pricingList: PricingResponseDto[]): Map<string, number> {
    const result = new Map<string, number>();

    for (const pricing of pricingList) {
      result.set(pricing.id, pricing.duration);
    }

    return result;
  }

  private buildDefaulterQueryPart(users: User[]): { name: string, email: string }[] {
    return users.map((user: User) => {
      return { name: user.name(), email: user.email() }
    });
  }
}