import { v4 as uuidv4 } from 'uuid';
import { SubscriptionError } from '../errors/SubscriptionError';
import { ISerializable } from '../interfaces/ISerializable';
import { Email } from '../VO/Email.vo';
import { LastPaymentDate } from '../VO/LastPaymentDate.vo';
import { Password } from '../VO/Password.vo';
import { Pricing } from '../VO/Pricing.vo';
import { Subscription } from './Subscription.entity';
import { UserConfig } from './UserConfig.entity';

export class User implements ISerializable {
  public static build(name: string, email: Email, config: UserConfig): User {
    return new User(uuidv4(), name, email, config);
  }
  constructor(
    private id: string,
    private name: string,
    private email: Email,
    private config: UserConfig
  ) {}

  private subscription?: Subscription;
  private password?: string;

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email.email;
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

  public setSubscription(
    id: string,
    pricing: Pricing,
    lastPayment: LastPaymentDate,
    isWarned: boolean,
    isNotified: boolean
  ): void {
    this.subscription = new Subscription(
      id,
      pricing,
      lastPayment,
      isWarned,
      isNotified
    );
  }

  public hasSubscription(): boolean {
    if (this.subscription) {
      return true;
    }

    return false;
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

  public get pricing(): () => string {
    if (this.subscription) {
      return this.subscription.pricing;
    }

    throw new SubscriptionError();
  }

  public get paymentDate(): () => Date {
    if (this.subscription) {
      return this.subscription.paymentDate;
    }
    throw new SubscriptionError();
  }

  public get isNotified(): () => boolean {
    if (this.subscription) {
      return this.subscription.isNotified;
    }
    throw new SubscriptionError();
  }

  public get isWarned(): () => boolean {
    if (this.subscription) {
      return this.subscription.isWarned;
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

  public get subscriptionId(): () => string | null {
    if (!this.subscription) {
      return () => null;
    }
    return this.subscription!.id;
  }

  public get sendNotifications(): () => boolean {
    return this.config.getSendNotifications;
  }

  public get sendWarnings(): () => boolean {
    return this.config.getSendWarnings;
  }

  public get lang(): () => string {
    return this.config.getLang;
  }

  public get role(): () => string {
    return this.config.getRole;
  }

  public serialize(): Object {
    return {
      id: this.id,
      username: this.name,
      email: this.email.email,
      defaulter: this.subscription ? (this.isDefaulter() ? 'Si' : 'No') : null,
      subscription: this.subscription ? this.subscription.serialize() : null,
      config: this.config.serialize(),
    };
  }
}
