import { AggregateRoot } from "../../../Shared/Domain/Entities/AggregateRoot";
import { ID } from "../../../Shared/Domain/VO/Id.vo";
import { DEFAULT_DELAY_DAYS, DEFAULT_EMAIL_CONTENT, DEFAULT_WARNING_DAYS } from "./constants";

export class AppConfig extends AggregateRoot {
  public static build(
    userId: ID
  ): AppConfig {
    return new AppConfig(
      ID.generate(),
      DEFAULT_WARNING_DAYS,
      DEFAULT_DELAY_DAYS,
      DEFAULT_EMAIL_CONTENT,
      new Date(),
      userId
    );
  }

  constructor(
    _id: ID,
    private _warningDelay: number,
    private _notificationDelay: number,
    private _emailContent: string,
    private _lastSentReport: Date,
    private _userId: ID,
    _createdAt?: Date,
    _updateAt?: Date
  ) {
    super(_id, _createdAt, _updateAt);
  }


  public warningDelay(): number {
    return this._warningDelay;
  }

  public notificationDelay(): number {
    return this._notificationDelay;
  }

  public emailContent(): string {
    return this._emailContent;
  }

  public lastSentReport(): Date {
    return this._lastSentReport;
  }

  public userId(): ID {
    return this._userId;
  }
}