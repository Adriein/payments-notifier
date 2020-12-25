import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { PricingType } from '../constants';
import { Email } from '../VO/Email.vo';
import { LastPaymentDate } from '../VO/LastPaymentDate.vo';
import { Pricing } from '../VO/Pricing.vo';

export class User {
  public static build(
    name: string,
    email: Email,
    pricing: Pricing,
    lastPayment: LastPaymentDate
  ): User {
    return new User(
      uuidv4(),
      name,
      email.email,
      pricing.pricingType,
      lastPayment.date,
      false,
      false
    );
  }
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private pricing: string,
    private lastPayment: Date,
    private isWarned: boolean,
    private isNotified: boolean
  ) {}

  public isDefaulter(): boolean {
    const today = dayjs(new Date());

    const maxDate = dayjs(this.lastPayment).add(
      this.pricingToMonths(this.pricing),
      'month'
    );

    if (maxDate.isBefore(today)) {
      return true;
    }

    return false;
  }

  public isTwoDaysBeforeExpiration(): boolean {
    const today = dayjs(new Date());

    const maxDate = dayjs(this.lastPayment)
      .add(this.pricingToMonths(this.pricing), 'month')
      .subtract(3, 'day');

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

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPricing(): string {
    return this.pricing;
  }

  public getPaymentDate(): Date {
    return this.lastPayment;
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
