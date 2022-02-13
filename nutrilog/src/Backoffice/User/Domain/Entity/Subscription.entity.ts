import { DateVo } from "../../../../Shared/Domain/VO/Date.vo";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { Time } from "../../../../Shared/Infrastructure/Helper/Time";
import { AggregateRoot } from "../../../../Shared/Domain/Entities/AggregateRoot";


export class Subscription extends AggregateRoot {
  public static build(
    userId: ID,
    pricingId: ID,
    lastPayment: DateVo,
    pricingDuration: number,
  ): Subscription {
    return new Subscription(
      ID.generate(),
      userId,
      pricingId,
      lastPayment,
      Subscription.expirationDate(lastPayment, pricingDuration),
      false,
      false,
      true,
      false,
    );
  }

  constructor(
    _id: ID,
    private _userId: ID,
    private _pricingId: ID,
    private _lastPayment: DateVo,
    private _validTo: DateVo,
    private _isWarned: boolean,
    private _isNotified: boolean,
    private _isActive: boolean,
    private _isExpired: boolean,
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

  public isNotified = (): boolean => {
    return this._isNotified;
  };

  public isWarned = (): boolean => {
    return this._isWarned;
  };

  public isActive = (): boolean => {
    return this._isActive;
  };

  public userId = (): ID => {
    return this._userId;
  }

  public hasExpired = (pricingDuration?: number): boolean => {
    if (pricingDuration) {
      this.checkExpired(pricingDuration);
    }
    return this._isExpired;
  };

  public static expirationDate = (lastPaymentDate: DateVo, pricingDuration: number): DateVo => {
    return new DateVo(Time.add(lastPaymentDate.value, pricingDuration));
  }

  private checkExpired = (pricingDuration: number): void => {
    const expirationDate = Subscription.expirationDate(this._lastPayment, pricingDuration);
    if (Time.equal(Time.now(), expirationDate.value)) {
      this._isExpired = true;
      this.entityUpdated();
    }
  }

  public daysExpired = (): number => {
    return Time.diff(this._validTo.value, Time.now());
  };

  public daysToExpire = (): number => {
    return Time.diff(this._validTo.value, Time.now());
  }

  public isAboutToExpire = (daysToWarn: number | undefined = 5): boolean => {
    const expirationDate = Time.add(this._lastPayment.value, 5);
    const warningDate = Time.subtract(expirationDate, daysToWarn)

    return Time.equal(Time.now(), warningDate);
  };

  public deactivate = (): void => {
    this._isActive = false;
    this.entityUpdated();
  }

  public warningIsSent(): void {
    this._isWarned = true;
    this.entityUpdated();
  }

}