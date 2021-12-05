import { AggregateRoot } from "../../../../Shared/Domain/Entities/AggregateRoot";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { SmtpEventTrackingStat } from "../VO/SmtpEventTrackingStat.vo";

export class EventTrackingStatCollection extends AggregateRoot {
  public static build(stats: SmtpEventTrackingStat[]): EventTrackingStatCollection {
    return new EventTrackingStatCollection(ID.generate(), stats);
  }

  constructor(_id: ID, private _stats: SmtpEventTrackingStat[]) {
    super(_id);
  }

  public totalEmailSent(): number {
    return this._stats.reduce((total: number, stat: SmtpEventTrackingStat) => {
      return total + stat.totalEmailSent();
    }, 0);
  }

  public totalEmailRead(): number {
    return this._stats.reduce((total: number, stat: SmtpEventTrackingStat) => {
      return total + stat.totalEmailRead();
    }, 0);
  }
}