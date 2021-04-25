import { v4 as uuidv4 } from 'uuid';
import { SubscriptionError } from '../Errors/Users/SubscriptionError';
import { ISerializable } from '../Interfaces/ISerializable';
import { Email } from '../VO/Email.vo';
import { LastPaymentDate } from '../VO/LastPaymentDate.vo';
import { Password } from '../VO/Password.vo';
import { Pricing } from '../VO/Pricing.vo';
import { Subscription } from './Subscription.entity';
import { UserConfig } from './UserConfig.entity';

export class User implements ISerializable {
  public static build(
    name: string,
    email: Email,
    config: UserConfig,
    ownerId?: string
  ): User {
    return new User(uuidv4(), name, email, config, ownerId);
  }
  constructor(
    private _id: string,
    private _name: string,
    private _email: Email,
    private _config: UserConfig,
    private _ownerId?: string
  ) {}

  private _subscription?: Subscription;
  private _password?: string;
  private _createdAt?: Date;
  private _nutritionId?: string;

  public id(): string {
    return this._id;
  }

  public name(): string {
    return this._name;
  }

  public email(): string {
    return this._email.value;
  }

  public nutritionId(): string | undefined {
    return this._nutritionId;
  }

  public setNutritionId(id: string): void {
    this._nutritionId = id;
  }

  public get ownerId(): string | undefined {
    return this._ownerId;
  }

  public get createdAt(): Date {
    return this._createdAt!;
  }

  public setCreatedAt(date: Date) {
    this._createdAt = date;
  }

  public async createPassword(password: Password): Promise<void> {
    this._password = await password.getHashedPassword();
  }

  public getPassword(): string | undefined {
    return this._password;
  }

  public setPassword(password: Password): void {
    this._password = password.value;
  }

  public createSubscription(
    pricing: Pricing,
    lastPayment: LastPaymentDate,
    isWarned: boolean = false,
    isNotified: boolean = false
  ): void {
    this._subscription = Subscription.build(
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
    isNotified: boolean,
    isActive: boolean
  ): void {
    this._subscription = new Subscription(
      id,
      pricing,
      lastPayment,
      isWarned,
      isNotified,
      isActive
    );
  }

  public hasSubscription = (): boolean => {
    if (this._subscription) {
      return true;
    }

    return false;
  };

  public get isSubscriptionActive(): () => boolean {
    if (this._subscription) {
      return this._subscription.isActive;
    }
    throw new SubscriptionError();
  }

  public get isDefaulter(): () => boolean {
    if (this._subscription) {
      return this._subscription.isDefaulter;
    }
    throw new SubscriptionError();
  }

  public get isOneDayOldDefaulter(): () => boolean {
    if (this._subscription) {
      return this._subscription.isOneDayOldDefaulter;
    }
    throw new SubscriptionError();
  }

  public get isConfiguredDaysBeforeExpiration(): (
    daysBeforeExpiration: number | undefined
  ) => boolean {
    if (this._subscription) {
      return this._subscription.isConfiguredDaysBeforeExpiration;
    }
    throw new SubscriptionError();
  }

  public get resetNotificationState(): () => void {
    if (this._subscription) {
      return this._subscription.resetNotificationState;
    }

    throw new SubscriptionError();
  }

  public get pricing(): () => Pricing {
    if (this._subscription) {
      return this._subscription.pricing;
    }

    throw new SubscriptionError();
  }

  public get paymentDate(): () => Date {
    if (this._subscription) {
      return this._subscription.paymentDate;
    }
    throw new SubscriptionError();
  }

  public get isNotified(): () => boolean {
    if (this._subscription) {
      return this._subscription.isNotified;
    }
    throw new SubscriptionError();
  }

  public get isWarned(): () => boolean {
    if (this._subscription) {
      return this._subscription.isWarned;
    }

    throw new SubscriptionError();
  }

  public get setIsNotified(): () => void {
    if (this._subscription) {
      return this._subscription.setIsNotified;
    }

    throw new SubscriptionError();
  }

  public get setIsWarned(): () => void {
    if (this._subscription) {
      return this._subscription.setIsWarned;
    }

    throw new SubscriptionError();
  }

  public get desactivateExpiredSubscription(): () => void {
    if (this._subscription) {
      return this._subscription.desactivateExpiredSubscription;
    }

    throw new SubscriptionError();
  }

  public get subscriptionId(): () => string | null {
    if (!this._subscription) {
      return () => null;
    }
    return this._subscription!.id;
  }

  public get sendNotifications(): () => boolean {
    return this._config.getSendNotifications;
  }

  public get sendWarnings(): () => boolean {
    return this._config.getSendWarnings;
  }

  public get lang(): () => string {
    return this._config.getLang;
  }

  public get role(): () => string {
    return this._config.getRole;
  }

  public get configId(): () => string | undefined {
    return this._config.getId;
  }

  public serialize(): Object {
    return {
      id: this._id,
      username: this._name,
      email: this._email.value,
      defaulter: this._subscription ? (this.isDefaulter() ? 'Si' : 'No') : null,
      subscription: this._subscription ? this._subscription.serialize() : null,
      config: this._config.serialize(),
    };
  }
}
