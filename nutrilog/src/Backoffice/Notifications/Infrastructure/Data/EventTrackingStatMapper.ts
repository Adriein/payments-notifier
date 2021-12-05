import { IEmailMapper } from "../../Domain/IEmailMapper";
import { SmtpEventTrackingStat } from "../../Domain/VO/SmtpEventTrackingStat.vo";
import { EventTrackingStatModel } from "./EventTrackingStatModel";

export class EventTrackingStatMapper implements IEmailMapper<SmtpEventTrackingStat, EventTrackingStatModel> {
  public toDataModel(domain: SmtpEventTrackingStat): EventTrackingStatModel {
    throw new Error('not implemented');
  }

  public toDomain(dataModel: EventTrackingStatModel): SmtpEventTrackingStat {
    return new SmtpEventTrackingStat(
      new Date(dataModel.date),
      dataModel.stats[0].metrics.processed,
      dataModel.stats[0].metrics.unique_opens
    );
  }
}