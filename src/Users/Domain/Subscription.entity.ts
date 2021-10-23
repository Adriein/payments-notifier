import { BaseEntity } from "../../Domain/Entities/BaseEntity";
import { LastPaymentDate } from "../../Shared/Domain/VO/LastPaymentDate.vo";
import { ID } from "../../Shared/Domain/VO/Id.vo";
import { Pricing } from "../../Pricing/Domain/Pricing.entity";
import { DateUtils } from "../../Shared/Infrastructure/Helper/Date.utils";

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
      true
    );
  }

  constructor(
    _id: ID,
    private _pricingId: ID,
    private _lastPayment: LastPaymentDate,
    private _isWarned: boolean,
    private _isNotified: boolean,
    private _isActive: boolean
  ) {
    super(_id);
  }


  public hasExpired = (): boolean => {
    const expirationDate = DateUtils.add(this._lastPayment.value, this._pricing.duration())
    return DateUtils.before(expirationDate, new Date());
  };

  public daysExpired = (): number => {
    const expirationDate = DateUtils.add(this._lastPayment.value, this._pricing.duration())
    return DateUtils.diff(expirationDate, new Date());
  };

  public isAboutToExpire = (daysToWarn: number | undefined = 5): boolean => {
    const expirationDate = DateUtils.add(this._lastPayment.value, this._pricing.duration());
    const warningDate = DateUtils.subtract(expirationDate, daysToWarn)

    return DateUtils.equal(new Date(), warningDate);
  };

  public price = (): number => {
    return this._pricing.price();
  }

  public duration = (): number => {
    return this._pricing.duration();
  }

  public name = (): string => {
    return this._pricing.name();
  }

  public pricingId = (): string => {
    return this._pricing.id();
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
}