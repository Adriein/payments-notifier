import { IEmailMapper } from "../../Domain/IEmailMapper";
import { NutrilogEmail } from "../../Domain/Entity/NutrilogEmail.entity";
import { ReportEmailModel } from "./ReportEmailModel";
import { ExpiredSubscriptionsReport } from "../../Domain/Entity/ExpiredSubscriptionsReport.entity";
import { Time } from "../../../../Shared/Infrastructure/Helper/Time";
import { Defaulter } from "../../Domain/VO/Defaulter.vo";


export class ReportEmailMapper implements IEmailMapper<NutrilogEmail<ExpiredSubscriptionsReport>, ReportEmailModel> {
  toDataModel(domain: NutrilogEmail<ExpiredSubscriptionsReport>): ReportEmailModel {
    return {
      subject: domain.subject(),
      summary: {
        totalDefaulters: domain.content().summary().totalDefaulter(),
        reportDate: Time.format(domain.content().summary().reportDate(), Time.EUROPEAN_DATE_FORMAT),
        lastReportDate: Time.format(domain.content().summary().lastReportDate(), Time.EUROPEAN_DATE_FORMAT),
        totalEmailsRead: domain.content().summary().totalAboutToExpireEmailRead(),
        totalWarningEmailsSent: domain.content().summary().totalAboutToExpireEmailSent()
      },
      defaulters: this.formatDefaulterList(domain.content().defaulterList()),
      oldDefaulters: this.formatDefaulterList(domain.content().oldDefaulterList()),
    };
  }

  toDomain(dataModel: ReportEmailModel): NutrilogEmail<ExpiredSubscriptionsReport> {
    throw new Error('not implemented');
  }

  private formatDefaulterList(defaulterList: Defaulter[]): { name: string, email: string }[] {
    return defaulterList.map((defaulter: Defaulter) => {
      return { name: defaulter.name(), email: defaulter.email() }
    });
  }

}