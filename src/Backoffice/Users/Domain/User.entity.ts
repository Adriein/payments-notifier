import { AggregateRoot } from "../../../Shared/Domain/Entities/AggregateRoot";
import { ID } from "../../../Shared/Domain/VO/Id.vo";
import { Password } from "../../../Shared/Domain/VO/Password.vo";
import { Email } from "../../../Shared/Domain/VO/Email.vo";
import { UserConfig } from "./UserConfig.entity";
import { Subscription } from "./Subscription.entity";
import { LastPaymentDate } from "../../../Shared/Domain/VO/LastPaymentDate.vo";


export class User extends AggregateRoot {
  public static build(
    ownerId: ID,
    name: string,
    password: Password,
    email: Email,
    config: UserConfig,
    subscription: Subscription,
    roleId: ID
  ): User {
    return new User(ID.generate(), name, password, email, config, ownerId, roleId, subscription, true);
  }

  constructor(
    _id: ID,
    private _name: string,
    private _password: Password,
    private _email: Email,
    private _config: UserConfig,
    private _ownerId: ID,
    private _roleId: ID,
    private _subscription: Subscription,
    private _active: boolean,
    private _appConfigId?: ID,
    _createdAt?: Date,
    _updatedAt?: Date
  ) {
    super(_id, _createdAt, _updatedAt);
  }

  public name(): string {
    return this._name;
  }

  public email(): string {
    return this._email.value;
  }

  public password(): string {
    return this._password.value;
  }

  public ownerId(): string {
    return this._ownerId.value;
  }

  public isActive(): boolean {
    return this._active;
  }

  public configId = (): string => {
    return this._config.id();
  }

  public language = (): string => {
    return this._config.lang();
  }

  public roleId = (): string => {
    return this._roleId.value;
  }

  public sendNotifications = (): boolean => {
    return this._config.sendNotifications();
  }

  public sendWarnings = (): boolean => {
    return this._config.sendWarnings();
  }

  public configCreatedAt = (): Date => {
    return this._config.createdAt();
  }

  public configUpdatedAt = (): Date => {
    return this._config.updatedAt();
  }

  public paymentDate = (): Date => {
    return this._subscription.paymentDate();
  };

  public isNotified = (): boolean => {
    return this._subscription.isNotified();
  };

  public isWarned = (): boolean => {
    return this._subscription.isWarned();
  };

  public isSubscriptionActive = (): boolean => {
    return this._subscription.isActive();
  };

  public pricingId = (): string => {
    return this._subscription.pricingId();
  }

  public subscriptionId = (): string => {
    return this._subscription.id();
  }

  public isSubscriptionExpired = (): boolean => {
    return this._subscription.hasExpired();
  }

  public subscriptionCreatedAt = (): Date => {
    return this._subscription.createdAt();
  }

  public subscriptionUpdatedAt = (): Date => {
    return this._subscription.updatedAt();
  }

  public deactivateExpiredSubscription(): void {
    this._subscription.deactivate();
  }

  public renewSubscription(pricingId: ID, paymentDate: LastPaymentDate): void {
    this._subscription = Subscription.build(pricingId, paymentDate);
  }

  public subscriptionWarnings(warnings: boolean): void {
    this._config.warnings(warnings);
  }

  public subscriptionIsAboutToExpire(days: number): boolean {
    return this._subscription.isAboutToExpire(days)
  }

  public deactivateUser(): void {
    this._active = false;
    this.deactivateExpiredSubscription();
  }
}