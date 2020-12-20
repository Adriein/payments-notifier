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
    return new User(uuidv4(), name, email, pricing, lastPayment, false, false);
  }
  constructor(
    private id: string,
    private name: string,
    private email: Email,
    private pricing: Pricing,
    private lastPayment: LastPaymentDate,
    private sentWarning: boolean,
    private sentDefaulter: boolean
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

    const maxDate = dayjs(this.lastPayment.date).add(
      this.pricingToMonths(this.pricing.pricingType),
      'month'
    );

    if (
      maxDate.isAfter(today.subtract(2, 'day')) ||
      maxDate.isSame(today.subtract(2, 'day'))
    ) {
      return true;
    }

    return false;
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
    return this.email.email;
  }

  public getPricing(): string {
    return this.pricing.pricingType;
  }

  public getPaymentDate(): Date {
    return this.lastPayment.date;
  }

  public setSentDefaulter(): void {
    this.sentDefaulter = true;
  }

  public setSentWarning(): void {
    this.sentWarning = true;
  }
}
