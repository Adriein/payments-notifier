import { v4 as uuidv4 } from 'uuid';
import { LastPaymentDate } from '../VO/LastPaymentDate.vo';
import { Pricing } from '../VO/Pricing.vo';
import dayjs from 'dayjs';
import { ISerializable } from '../Interfaces/ISerializable';
import { debug } from '../../Infraestructure/Helpers/Debug.utils';
import { Time } from '../../Infraestructure/Helpers/Time.utils';

export class Subscription implements ISerializable {
  public static build(
    pricing: Pricing,
    lastPayment: LastPaymentDate,
    isWarned: boolean,
    isNotified: boolean,
    isActive: boolean = true
  ): Subscription {
    return new Subscription(
      uuidv4(),
      pricing,
      lastPayment,
      isWarned,
      isNotified,
      isActive
    );
  }
  constructor(
    private _id: string,
    private _pricing: Pricing,
    private _lastPayment: LastPaymentDate,
    private _isWarned: boolean,
    private _isNotified: boolean,
    private _isActive: boolean
  ) {
    this.priceName = Object.keys(this._pricing.value)[0];
  }

  private priceName: string;

  public isDefaulter = (): boolean => {
    const today = dayjs(new Date());

    const maxDate = dayjs(this._lastPayment.value).add(
      this._pricing.value[this.priceName].duration,
      'day'
    );

    if (maxDate.isBefore(today)) {
      return true;
    }

    return false;
  };

  public isOneDayOldDefaulter = (): boolean => {
    const today = dayjs(new Date());

    const maxDate = dayjs(this._lastPayment.value).add(
      this._pricing.value[this.priceName].duration,
      'day'
    );

    if (today.diff(maxDate, 'day') >= 1) {
      return true;
    }

    return false;
  };

  public isAboutToExpire = (
    daysBeforeExpiration: number | undefined = 5
  ): boolean => {
    const today = dayjs(new Date());
    const maxDate = dayjs(this._lastPayment.value)
      .add(this._pricing.value[this.priceName].duration, 'day')
      .subtract(daysBeforeExpiration, 'day');

    if (maxDate.isSame(today, 'day')) {
      return true;
    }

    return false;
  };

  public resetNotificationState = (): void => {
    if (this._isNotified) {
      this.setIsNotified();
    }
    if (this._isWarned) {
      this.setIsWarned();
    }
  };

  public desactivateExpiredSubscription = (): void => {
    this._isActive = false;
  };

  public id = (): string => {
    return this._id;
  };

  public pricing = (): Pricing => {
    return this._pricing;
  };

  public paymentDate = (): Date => {
    return this._lastPayment.value;
  };

  public isNotified = (): boolean => {
    return this._isNotified;
  };

  public isWarned = (): boolean => {
    return this._isWarned;
  };

  public setIsNotified = (): void => {
    this._isNotified = !this._isNotified;
  };

  public setIsWarned = (): void => {
    this._isWarned = !this._isWarned;
  };

  public isActive = (): boolean => {
    return this._isActive;
  };

  public setIsActive = (): void => {
    this._isActive = !this._isActive;
  };

  public serialize = (): Object => {
    const ye = new Intl.DateTimeFormat('es', { year: 'numeric' }).format(
      this.paymentDate()
    );
    const mo = new Intl.DateTimeFormat('es', { month: '2-digit' }).format(
      this.paymentDate()
    );
    const da = new Intl.DateTimeFormat('es', { day: '2-digit' }).format(
      this.paymentDate()
    );
    return {
      pricing: this._pricing.value,
      lastPayment: `${da}/${mo}/${ye}`,
      isWarned: this.isWarned() ? 'Si' : 'No',
      isNotified: this.isNotified() ? 'Si' : 'No',
      isActive: this.isActive() ? 'Si' : 'No',
    };
  };
}
