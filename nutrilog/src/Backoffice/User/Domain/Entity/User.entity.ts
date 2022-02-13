import { AggregateRoot } from "../../../../Shared/Domain/Entities/AggregateRoot";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { Password } from "../../../../Shared/Domain/VO/Password.vo";
import { Email } from "../../../../Shared/Domain/VO/Email.vo";
import { UserConfig } from "./UserConfig.entity";
import { Subscription } from "./Subscription.entity";
import { DateVo } from "../../../../Shared/Domain/VO/Date.vo";
import { DeactivatedSubscriptionDomainEvent } from "../DomainEvents/DeactivatedSubscriptionDomainEvent";
import { DomainEventsManager } from "../../../../Shared/Domain/Entities/DomainEventsManager";

export class User extends AggregateRoot {
  public static build(
    ownerId: ID,
    name: string,
    password: Password,
    email: Email,
    config: UserConfig,
    roleId: ID
  ): User {
    return new User(ID.generate(), name, password, email, config, ownerId, roleId, true);
  }

  constructor(
    _id: ID,
    private _name: string,
    private _password: Password,
    private _email: Email,
    private _config: UserConfig,
    private _ownerId: ID,
    private _roleId: ID,
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

  public configId = (): ID => {
    return this._config.id();
  }

  public language = (): string => {
    return this._config.lang();
  }

  public roleId = (): ID => {
    return this._roleId;
  }

  public sendNotifications = (): boolean => {
    return this._config.sendNotifications();
  }

  public sendWarnings = (): boolean => {
    return this._config.sendWarnings();
  }

  public async renewSubscription(pricingId: ID, paymentDate: DateVo, validTo: DateVo): Promise<Subscription> {
    this.addEvent(new DeactivatedSubscriptionDomainEvent(this.id()));
    await DomainEventsManager.publishEvents(this.id());
    return Subscription.build(this.id(), pricingId, paymentDate, validTo);
  }

  public createSubscription(pricingId: ID, paymentDate: DateVo, validTo: DateVo): Subscription {
    return Subscription.build(this.id(), pricingId, paymentDate, validTo);
  }

  public acceptWarnings(warnings: boolean): void {
    this._config.warnings(warnings);
  }

  public async deactivate(): Promise<void> {
    this._active = false;
    this.addEvent(new DeactivatedSubscriptionDomainEvent(this.id()));
    await DomainEventsManager.publishEvents(this.id());
  }
}