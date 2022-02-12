import { IDomainEventHandler } from "../../../Shared/Domain/Interfaces/IDomainEventHandler";
import { SendExpiredSubscriptionsReportEmailDomainEvent } from "../Domain/DomainEvents/SendExpiredSubscriptionsReportEmailDomainEvent";
import { DomainEventsHandler } from "../../../Shared/Domain/Decorators/DomainEventsHandler.decorator";
import { Log } from "../../../Shared/Domain/Decorators/Log";
import { ISmtpServiceRepository } from "../Domain/Repository/ISmtpServiceRepository";
import { NutrilogEmail } from "../Domain/Entity/NutrilogEmail.entity";
import { ExpiredSubscriptionsReport } from "../Domain/Entity/ExpiredSubscriptionsReport.entity";
import { EmailHeader } from "../Domain/Entity/EmailHeader.entity";
import { ADMIN_EMAIL_CONFIG_SUBJECT, NOTIFICATIONS_EMAIL, REPORT_DYNAMIC_TEMPLATE } from "../Domain/constants";
import { Email } from "../../../Shared/Domain/VO/Email.vo";
import { FindUserResponse } from "../../User/Application/Find/FindUserResponse";
import { Defaulter } from "../Domain/VO/Defaulter.vo";
import { Summary } from "../Domain/VO/Summary.vo";
import { IEmailServiceApiRepository } from "../Domain/Repository/IEmailServiceApiRepository";

@DomainEventsHandler(SendExpiredSubscriptionsReportEmailDomainEvent)
export class SendExpiredSubscriptionsReportEmailDomainEventHandler implements IDomainEventHandler {
  constructor(
    private readonly smtpRepository: ISmtpServiceRepository<NutrilogEmail<ExpiredSubscriptionsReport>>,
    private readonly apiRepository: IEmailServiceApiRepository
  ) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(event: SendExpiredSubscriptionsReportEmailDomainEvent): Promise<void> {
    const statsResponse = await this.apiRepository.getSmtpServiceStats(event.lastReportDate, new Date());

    if (statsResponse.isLeft()) {
      throw statsResponse.value;
    }

    const statsCollection = statsResponse.value;

    const header = new EmailHeader(
      ADMIN_EMAIL_CONFIG_SUBJECT,
      new Email(NOTIFICATIONS_EMAIL),
      new Email(process.env.ADMIN_EMAIL!),
      REPORT_DYNAMIC_TEMPLATE
    );

    const reportSummary = new Summary(
      event.totalDefaulters,
      event.lastReportDate,
      new Date(),
      statsCollection.totalEmailSent(),
      statsCollection.totalEmailRead()
    );

    const report = new ExpiredSubscriptionsReport(
      this.buildDefaulterList(event.defaulters),
      this.buildDefaulterList(event.oldDefaulters),
      reportSummary
    );

    const email = NutrilogEmail.build<ExpiredSubscriptionsReport>(header, report);

    await this.smtpRepository.send(email);
  }

  private buildDefaulterList(users: FindUserResponse[]): Defaulter[] {
    return users.map((user: FindUserResponse) => new Defaulter(user.username, new Email(user.email)));
  }
}