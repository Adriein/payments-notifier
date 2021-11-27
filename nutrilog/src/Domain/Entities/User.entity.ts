import { SubscriptionError } from '../Errors';
import { Email } from '../../Shared/Domain/VO/Email.vo';
import { ID } from '../../Shared/Domain/VO/Id.vo';
import { LastPaymentDate } from '../../Shared/Domain/VO/LastPaymentDate.vo';
import { Password } from '../../Shared/Domain/VO/Password.vo';
import { Pricing } from '../VO/Pricing.vo';
import { BaseEntity } from '../../Shared/Domain/Entities/BaseEntity';
import { Subscription } from './Subscription.entity';
import { UserConfig } from './UserConfig.entity';

export class User extends BaseEntity {
  public static build(
    name: string,
    email: Email,
    config: UserConfig,
    ownerId?: string
  ): User {
    return new User(ID.generate(), name, email, config, ownerId);
  }

  constructor(
    _id: ID,
    private name: string,
    private email: Email,
    private config: UserConfig,
    private _ownerId?: string
  ) {
    super(_id, new Date(), new Date());
  }

  private subscription?: Subscription;
  private password?: string;

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email.value;
  }

  public get ownerId(): string | undefined {
    return this._ownerId;
  }

  public async createPassword(password: Password): Promise<void> {
    this.password = await password.getHashedPassword();
  }

  public getPassword(): string | undefined {
    return this.password;
  }

  public setPassword(password: Password): void {
    this.password = password.value;
  }

  public createSubscription(
    pricing: Pricing,
    lastPayment: LastPaymentDate,
    id?: string,
    isWarned: boolean = false,
    isNotified: boolean = false,
    isActive: boolean = false
  ): void {
    if (!id) {
      this.subscription = Subscription.build(
        pricing,
        lastPayment,
        isWarned,
        isNotified
      );
      return;
    }

    this.subscription = new Subscription(
      id,
      pricing,
      lastPayment,
      isWarned,
      isNotified,
      isActive
    );
  }

  public hasSubscription = (): boolean => {
    if (this.subscription) {
      return true;
    }

    return false;
  };

  public get isSubscriptionActive(): () => boolean {
    if (this.subscription) {
      return this.subscription.isActive;
    }
    throw new SubscriptionError();
  }

  public get isDefaulter(): () => boolean {
    if (this.subscription) {
      return this.subscription.isDefaulter;
    }
    throw new SubscriptionError();
  }

  public get isOneDayOldDefaulter(): () => boolean {
    if (this.subscription) {
      return this.subscription.isOneDayOldDefaulter;
    }
    throw new SubscriptionError();
  }

  public get isAboutToExpire(): (
    daysBeforeExpiration: number | undefined
  ) => boolean {
    if (this.subscription) {
      return this.subscription.isAboutToExpire;
    }
    throw new SubscriptionError();
  }

  public get resetNotificationState(): () => void {
    if (this.subscription) {
      return this.subscription.resetNotificationState;
    }

    throw new SubscriptionError();
  }

  public get pricing(): () => Pricing {
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

  public get setIsNotified(): () => void {
    if (this.subscription) {
      return this.subscription.setIsNotified;
    }

    throw new SubscriptionError();
  }

  public get setIsWarned(): () => void {
    if (this.subscription) {
      return this.subscription.setIsWarned;
    }

    throw new SubscriptionError();
  }

  public get desactivateExpiredSubscription(): () => void {
    if (this.subscription) {
      return this.subscription.desactivateExpiredSubscription;
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

  public get configId(): () => string | undefined {
    return this.config.getId;
  }

  public serialize(): Object {
    return {
      id: this.id,
      username: this.name,
      email: this.email.value,
      defaulter: this.subscription ? (this.isDefaulter() ? 'Si' : 'No') : null,
      subscription: this.subscription ? this.subscription.serialize() : null,
      config: this.config.serialize(),
    };
  }
}
