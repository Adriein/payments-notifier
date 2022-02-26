import { IDomainEventHandler } from "../../../Shared/Domain/Interfaces/IDomainEventHandler";
import { SendAboutToExpireEmailDomainEvent } from "../Domain/DomainEvents/SendAboutToExpireEmailDomainEvent";
import { DomainEventsHandler } from "../../../Shared/Domain/Decorators/DomainEventsHandler.decorator";
import { Log } from "../../../Shared/Domain/Decorators/Log";
import { ISmtpServiceRepository } from "../Domain/Repository/ISmtpServiceRepository";
import { NutrilogEmail } from "../Domain/Entity/NutrilogEmail.entity";
import { IQueryBus } from "../../../Shared/Domain/Bus/IQueryBus";
import { FindTenantClientsResponse } from "../../User/Application/FindTenantClients/FindTenantClientsResponse";
import { GetClientProfileQuery } from "../../User/Application/GetClientProfile/GetClientProfileQuery";
import { EmailHeader } from "../Domain/Entity/EmailHeader.entity";
import { AboutToExpire } from "../Domain/Entity/AboutToExpire.entity";
import { CLIENT_EMAIL_CONFIG_SUBJECT, NOTIFICATIONS_EMAIL } from "../Domain/constants";
import { Email } from "../../../Shared/Domain/VO/Email.vo";
import { GetClientProfileResponse } from "../../User/Application/GetClientProfile/GetClientProfileResponse";

@DomainEventsHandler(SendAboutToExpireEmailDomainEvent)
export class SendAboutToExpireNotificationDomainEventHandler implements IDomainEventHandler {

  constructor(
    private readonly repository: ISmtpServiceRepository<NutrilogEmail<string>>,
    private readonly queryBus: IQueryBus
  ) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(event: SendAboutToExpireEmailDomainEvent): Promise<void> {
    const user = await this.queryBus.ask<GetClientProfileResponse>(new GetClientProfileQuery(event.aggregateId.value));

    const header = new EmailHeader(
      CLIENT_EMAIL_CONFIG_SUBJECT,
      new Email(NOTIFICATIONS_EMAIL),
      new Email(user.email)
    );

    const template = new AboutToExpire(
      user.username,
      Number(process.env.DAYS_BEFORE_EXPIRATION!),
      user.subscription[0].pricing.name
    );

    const email = NutrilogEmail.build<string>(header, template.generate());

    await this.repository.send(email);

  }
}