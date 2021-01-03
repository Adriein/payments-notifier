import { v4 as uuidv4 } from 'uuid';
import { SubscriptionError } from '../errors/SubscriptionError';
import { ISerialize } from '../interfaces/ISerialize';
import { Email } from '../VO/Email.vo';
import { LastPaymentDate } from '../VO/LastPaymentDate.vo';
import { Password } from '../VO/Password.vo';
import { Pricing } from '../VO/Pricing.vo';
import { Subscription } from './Subscription.entity';

export class User implements ISerialize {
  public static build(name: string, email: Email): User {
    return new User(uuidv4(), name, email);
  }
  constructor(
    private id: string,
    private name: string,
    private email: Email
  ) {}

  private subscription?: Subscription;
  private password?: string;

  public createSubscription(
    pricing: Pricing,
    lastPayment: LastPaymentDate,
    isWarned: boolean = false,
    isNotified: boolean = false
  ): void {
    this.subscription = Subscription.build(
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
    return this.email.email;
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

  public async createPassword(password: Password): Promise<void> {
    this.password = await password.getHashedPassword();
  }

  public getPassword(): string | undefined {
    return this.password;
  }

  public setPassword(password: Password): void {
    this.password = password.password;
  }

  public get subscriptionId(): () => string | null {
    if (!this.subscription) {
      return () => null;
    }
    return this.subscription!.getId;
  }

  public serialize(): Object {
    return {
      id: this.id,
      username: this.name,
      email: this.email.email,
      subscription: this.subscription
        ? {
            pricing: this.getPricing(),
            lastPayment: this.getPaymentDate(),
            isWarned: this.getIsWarned(),
            isNotified: this.getIsNotified(),
          }
        : null,
    };
  }
}
