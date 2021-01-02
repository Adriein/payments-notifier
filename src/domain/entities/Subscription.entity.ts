import { LastPaymentDate } from '../VO/LastPaymentDate.vo';
import { Pricing } from '../VO/Pricing.vo';
import dayjs from 'dayjs';
import { PricingType } from '../constants';

export class Subscription {
  constructor(
    private pricing: Pricing,
    private lastPayment: LastPaymentDate,
    private isWarned: boolean,
    private isNotified: boolean
  ) {}

  public isDefaulter(): boolean {
    const today = dayjs(new Date());

    const maxDate = dayjs(this.lastPayment.date).add(
      this.pricingToMonths(this.pricing.pricingType),
      'month'
    );

    if (maxDate.isBefore(today)) {
      return true;
    }

    return false;
  }

  public isTwoDaysBeforeExpiration(): boolean {
    const today = dayjs(new Date());
    const maxDate = dayjs(this.lastPayment.date)
      .add(this.pricingToMonths(this.pricing.pricingType), 'month')
      .subtract(2, 'day');

    if (maxDate.isSame(today, 'day')) {
      return true;
    }

    return false;
  }

  public resetNotificationState(): void {
    if (this.isNotified) {
      this.setIsNotified();
    }
    if (this.isWarned) {
      this.setIsWarned();
    }
  }

  private pricingToMonths(pricing: string) {
    switch (pricing) {
      case PricingType.monthly:
        return 1;
      case PricingType.quarterly:
        return 3;
      default:
        return 0;
    }
  }

  public getPricing(): string {
    return this.pricing.pricingType;
  }

  public getPaymentDate(): Date {
    return this.lastPayment.date;
  }

  public getIsNotified(): boolean {
    return this.isNotified;
  }

  public getIsWarned(): boolean {
    return this.isWarned;
  }

  public setIsNotified(): void {
    this.isNotified = !this.isNotified;
  }

  public setIsWarned(): void {
    this.isWarned = !this.isWarned;
  }
}
