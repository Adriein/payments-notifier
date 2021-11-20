import { BaseEntity } from "../../../Domain/Entities/BaseEntity";
import { LastPaymentDate } from "../../../Shared/Domain/VO/LastPaymentDate.vo";
import { ID } from "../../../Shared/Domain/VO/Id.vo";
import { DateUtils } from "../../../Shared/Infrastructure/Helper/Date.utils";


export class Subscription extends BaseEntity {
  public static build(
    pricingId: ID,
    lastPayment: LastPaymentDate,
  ): Subscription {
    return new Subscription(
      ID.generate(),
      pricingId,
      lastPayment,
      false,
      false,
      true,
      false,
    );
  }

  constructor(
    _id: ID,
    private _pricingId: ID,
    private _lastPayment: LastPaymentDate,
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

  private checkExpired = (pricingDuration: number): void => {
    const expirationDate = DateUtils.add(this._lastPayment.value, pricingDuration);
    if (DateUtils.equal(new Date(), expirationDate)) {
      this._isExpired = true;
    }
  }

  public daysExpired = (pricingDuration: number): number => {
    const expirationDate = DateUtils.add(this._lastPayment.value, pricingDuration)
    return DateUtils.diff(expirationDate, new Date());
  };

  public isAboutToExpire = (daysToWarn: number | undefined = 5): boolean => {
    const expirationDate = DateUtils.add(this._lastPayment.value, 5);
    const warningDate = DateUtils.subtract(expirationDate, daysToWarn)

    return DateUtils.equal(new Date(), warningDate);
  };

  public deactivate = (): void => {
    this._isActive = false;
    this.updated();
  }

  public pricingId = (): string => {
    return this._pricingId.value;
  }

  public paymentDate = (): Date => {
    return this._lastPayment.value;
  };

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