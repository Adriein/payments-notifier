import { v4 as uuidv4 } from 'uuid';
import { SubscriptionError } from '../errors/SubscriptionError';
import { Email } from '../VO/Email.vo';
import { LastPaymentDate } from '../VO/LastPaymentDate.vo';
import { Pricing } from '../VO/Pricing.vo';
import { Subscription } from './Subscription.entity';

export class User {
  public static build(name: string, email: Email): User {
    return new User(uuidv4(), name, email.email);
  }
  constructor(
    private id: string,
    private name: string,
    private email: string
  ) {}

  private subscription?: Subscription;

  public createSubscription(
    pricing: Pricing,
    lastPayment: LastPaymentDate,
    isWarned: boolean = false,
    isNotified: boolean = false
  ): void {
    this.subscription = new Subscription(
      pricing,
      lastPayment,
      isWarned,
      isNotified
    );
  }

  get isDefaulter(): () => boolean {
    if (this.subscription) {
      return this.subscription.isDefaulter;
    }
    throw new SubscriptionError();
  }

  get isTwoDaysBeforeExpiration(): () => boolean {
    if (this.subscription) {
      return this.subscription.isTwoDaysBeforeExpiration;
    }
    throw new SubscriptionError();
  }

  get resetNotificationState(): () => void {
    if (this.subscription) {
      return this.subscription.resetNotificationState;
    }

    throw new SubscriptionError();
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
    if (this.subscription) {
      return this.subscription.getPricing();
    }

    throw new SubscriptionError();
  }

  public getPaymentDate(): Date {
    if (this.subscription) {
      return this.subscription.getPaymentDate();
    }
    throw new SubscriptionError();
  }

  public getIsNotified(): boolean {
    if (this.subscription) {
      return this.subscription.getIsNotified();
    }
    throw new SubscriptionError();
  }

  public getIsWarned(): boolean {
    if (this.subscription) {
      return this.subscription.getIsWarned();
    }

    throw new SubscriptionError();
  }

  public setIsNotified(): () => void {
    if (this.subscription) {
      return this.subscription.setIsNotified;
    }

    throw new SubscriptionError();
  }

  public setIsWarned(): () => void {
    if (this.subscription) {
      return this.subscription.setIsWarned;
    }

    throw new SubscriptionError();
  }
}
