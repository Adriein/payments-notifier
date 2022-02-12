import { DateVo } from "../../../../Shared/Domain/VO/Date.vo";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { Time } from "../../../../Shared/Infrastructure/Helper/Time";
import { AggregateRoot } from "../../../../Shared/Domain/Entities/AggregateRoot";


export class Subscription extends AggregateRoot {
  public static build(
    userId: ID,
    pricingId: ID,
    lastPayment: DateVo,
    validTo: DateVo,
  ): Subscription {
    return new Subscription(
      ID.generate(),
      userId,
      pricingId,
      lastPayment,
      validTo,
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

  public hasExpired = (pricingDuration?: number): boolean => {
    if (pricingDuration) {
      this.checkExpired(pricingDuration);
    }
    return this._isExpired;
  };

  public expirationDate = (pricingDuration: number) => {
    return Time.add(this._lastPayment.value, pricingDuration);
  }

  private checkExpired = (pricingDuration: number): void => {
    const expirationDate = this.expirationDate(pricingDuration);
    if (Time.equal(new Date(), expirationDate)) {
      this._isExpired = true;
    }
  }

  public daysExpired = (pricingDuration: number): number => {
    const expirationDate = Time.add(this._lastPayment.value, pricingDuration)
    return Time.diff(expirationDate, new Date());
  };

  public isAboutToExpire = (daysToWarn: number | undefined = 5): boolean => {
    const expirationDate = Time.add(this._lastPayment.value, 5);
    const warningDate = Time.subtract(expirationDate, daysToWarn)

    return Time.equal(new Date(), warningDate);
  };

  public deactivate = (): void => {
    this._isActive = false;
    this.entityUpdated();
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

  public warningIsSent(): void {
    this._isWarned = true;
  }
}