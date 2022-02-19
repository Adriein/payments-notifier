import { DateVo } from "../../../../Shared/Domain/VO/Date.vo";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { Time } from "../../../../Shared/Infrastructure/Helper/Time";
import { AggregateRoot } from "../../../../Shared/Domain/Entities/AggregateRoot";
import { SubscriptionHistory } from "./SubscriptionHistory.entity";
import { SUBSCRIPTION_STATUS } from "../constants";
import { SubscriptionHistoryCollection } from "./SubscriptionHistoryCollection";
import { SendAboutToExpireEmailDomainEvent } from "../../../Notifications/Domain/DomainEvents/SendAboutToExpireEmailDomainEvent";
import { DomainEventsManager } from "../../../../Shared/Domain/Entities/DomainEventsManager";

export class Subscription extends AggregateRoot {
  public static build(
    userId: ID,
    pricingId: ID,
    lastPayment: DateVo,
    pricingDuration: number,
  ): Subscription {
    const event = SubscriptionHistory.build(SUBSCRIPTION_STATUS.CREATED);
    return new Subscription(
      ID.generate(),
      userId,
      pricingId,
      lastPayment,
      Subscription.expirationDate(lastPayment, pricingDuration),
      true,
      false,
      SubscriptionHistoryCollection.build([ event ])
    );
  }

  constructor(
    _id: ID,
    private _userId: ID,
    private _pricingId: ID,
    private _lastPayment: DateVo,
    private _validTo: DateVo,
    private _isActive: boolean,
    private _isExpired: boolean,
    private _history: SubscriptionHistoryCollection,
    _createdAt?: Date,
    _updatedAt?: Date
  ) {
    super(_id, _createdAt, _updatedAt);
  }

  public pricingId = (): string => {
    return this._pricingId.value;
  }

  public paymentDate = (): Date => {
    return this._lastPayment.value;
  };

  public validTo(): Date {
    return this._validTo.value;
  }

  public isActive = (): boolean => {
    return this._isActive;
  };

  public userId = (): ID => {
    return this._userId;
  }

  public isExpired = (): boolean => {
    return this._isExpired;
  };

  public static expirationDate = (lastPaymentDate: DateVo, pricingDuration: number): DateVo => {
    return new DateVo(Time.add(lastPaymentDate.value, pricingDuration));
  }

  private addEventToHistory(history: SubscriptionHistory): void {
    this.entityUpdated();
    this._history.add(history);
  }

  public checkIsExpired = (pricingDuration: number): void => {
    const expirationDate = Subscription.expirationDate(this._lastPayment, pricingDuration);
    if (Time.equal(Time.now(), expirationDate.value)) {
      this._isExpired = true;
      this.addEventToHistory(SubscriptionHistory.build(SUBSCRIPTION_STATUS.EXPIRED));
    }
  }

  public checkIsAboutToExpire = (daysToWarn: number | undefined = 5): void => {
    const expirationDate = Time.add(this._lastPayment.value, 5);
    const warningDate = Time.subtract(expirationDate, daysToWarn)

    const isAboutToExpire = Time.equal(Time.now(), warningDate);

    if (isAboutToExpire) {
      this.addEvent(new SendAboutToExpireEmailDomainEvent(this.id(), this.userId()));
      this.addEventToHistory(SubscriptionHistory.build(SUBSCRIPTION_STATUS.ABOUT_TO_EXPIRE));
      DomainEventsManager.publishEvents(this.id());
    }
  };

  public isAboutToExpire(): boolean {
    return this._history.containsAboutToExpireEvent();
  }

  public deactivate = (): void => {
    this._isActive = false;
    this.entityUpdated();
    this.addEventToHistory(SubscriptionHistory.build(SUBSCRIPTION_STATUS.INACTIVE));
  }
}