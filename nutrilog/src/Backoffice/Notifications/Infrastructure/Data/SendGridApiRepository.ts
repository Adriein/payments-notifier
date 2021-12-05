import { IEmailServiceApiRepository } from "../../Domain/Repository/IEmailServiceApiRepository";
import { SmtpEventTrackingStat } from "../../Domain/VO/SmtpEventTrackingStat.vo";
import { EventTrackingStatModel } from "./EventTrackingStatModel";
import { HttpApi } from "../../../../Shared/Infrastructure/Data/HttpApi";
import { Either } from "../../../../Shared/Domain/types";
import { Left } from "../../../../Shared/Domain/Entities/Left";
import { IEmailMapper } from "../../Domain/IEmailMapper";
import { EventTrackingStatMapper } from "./EventTrackingStatMapper";
import { Right } from "../../../../Shared/Domain/Entities/Right";
import { DateUtils } from "../../../../Shared/Infrastructure/Helper/Date.utils";
import { EventTrackingStatCollection } from "../../Domain/Entity/EventTrackingStatCollection.entity";

export class SendGridApiRepository extends HttpApi implements IEmailServiceApiRepository {
  protected BASE_URL: string = 'https://api.sendgrid.com/v3';
  private mapper: IEmailMapper<SmtpEventTrackingStat, EventTrackingStatModel> = new EventTrackingStatMapper();

  public async getSmtpServiceStats(from: Date, to: Date): Promise<Either<Error, EventTrackingStatCollection>> {
    try {
      const results = await this.get<EventTrackingStatModel[]>(
        '/stats',
        {
          headers: {
            Authorization: `Bearer ${process.env.SEND_GRID_API_KEY!}`,
            'Content-Type': 'application/json',
          },
          params: {
            start_date: DateUtils.format(from, DateUtils.AMERICAN_DATE_FORMAT),
            end_date: DateUtils.format(to, DateUtils.AMERICAN_DATE_FORMAT),
          },
        }
      );

      const collection = EventTrackingStatCollection.build(results.map((result: EventTrackingStatModel) => this.mapper.toDomain(
        result)));

      return Right.success(collection);
    } catch (error) {
      return Left.error(error);
    }
  }
}