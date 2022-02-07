import { AggregateRoot } from "../../../../Shared/Domain/Entities/AggregateRoot";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { Password } from "../../../../Shared/Domain/VO/Password.vo";
import { Email } from "../../../../Shared/Domain/VO/Email.vo";
import { UserConfig } from "./UserConfig.entity";
import { Subscription } from "./Subscription.entity";
import { DateVo } from "../../../../Shared/Domain/VO/Date.vo";
import { SubscriptionCollection } from "./SubscriptionCollection";


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
    const collection = SubscriptionCollection.build(subscription);
    return new User(ID.generate(), name, password, email, config, ownerId, roleId, collection, true);
  }

  constructor(
    _id: ID,
    private _name: string,
    private _password: Password,
    private _email: Email,
    private _config: UserConfig,
    private _ownerId: ID,
    private _roleId: ID,
    private _subscriptionList: SubscriptionCollection,
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
    return this._subscriptionList.getActiveSubscription().paymentDate();
  };

  public isNotified = (): boolean => {
    return this._subscriptionList.getActiveSubscription().isNotified();
  };

  public isWarned = (): boolean => {
    return this._subscriptionList.getActiveSubscription().isWarned();
  };

  public hasBeenWarned(): void {
    this._subscriptionList.getActiveSubscription().warningIsSent();
  }

  public isSubscriptionActive = (): boolean => {
    return this._subscriptionList.getActiveSubscription().isActive();
  };

  public pricingId = (): string => {
    return this._subscriptionList.getActiveSubscription().pricingId();
  }

  public subscriptionId = (): string => {
    return this._subscriptionList.getActiveSubscription().id();
  }

  public isSubscriptionExpired = (priceDuration?: number): boolean => {
    return this._subscriptionList.getActiveSubscription().hasExpired(priceDuration);
  }

  public subscriptionCreatedAt = (): Date => {
    return this._subscriptionList.getActiveSubscription().createdAt();
  }

  public subscriptionUpdatedAt = (): Date => {
    return this._subscriptionList.getActiveSubscription().updatedAt();
  }

  public deactivateExpiredSubscription(): void {
    this._subscriptionList.getActiveSubscription().deactivate();
  }

  public renewSubscription(pricingId: ID, paymentDate: DateVo, validTo: DateVo): void {
    const subscription = Subscription.build(pricingId, paymentDate, validTo);
    this._subscriptionList.add(subscription);
  }

  public acceptWarnings(warnings: boolean): void {
    this._config.warnings(warnings);
  }

  public subscriptionIsAboutToExpire(days: number): boolean {
    return this._subscriptionList.getActiveSubscription().isAboutToExpire(days)
  }

  public howLongHasSubscriptionExpired(pricingDuration: number): number {
    return this._subscriptionList.getActiveSubscription().daysExpired(pricingDuration);
  }

  public subscriptionExpirationDate(pricingDuration: number): DateVo {
    return new DateVo(this._subscriptionList.getActiveSubscription().expirationDate(pricingDuration));
  }

  public subscriptionValidTo(): Date {
    return this._subscriptionList.getActiveSubscription().validTo();
  }

  public deactivate(): void {
    this._active = false;
    this.deactivateExpiredSubscription();
  }
}