import { AggregateRoot } from "../../Shared/Domain/Entities/AggregateRoot";
import { Email } from "../../Shared/Domain/VO/Email.vo";
import { ID } from "../../Shared/Domain/VO/Id.vo";
import { Password } from "../../Shared/Domain/VO/Password.vo";
import { Subscription } from "./Subscription.entity";
import { UserConfig } from "./UserConfig.entity";

export class User extends AggregateRoot {
  public static build(
    ownerId: ID,
    name: string,
    password: Password,
    email: Email,
    config: UserConfig,
    subscription: Subscription
  ): User {
    return new User(ID.generate(), name, email, config, ownerId, subscription);
  }

  constructor(
    _id: ID,
    private _name: string,
    private _email: Email,
    private _config: UserConfig,
    private _ownerId: ID,
    private _subscription: Subscription
  ) {
    super(_id);
  }

  public name(): string {
    return this._name;
  }

  public email(): string {
    return this._email.value;
  }

  public ownerId(): string {
    return this._ownerId.value;
  }

  public lang = (): string => {
    return this._config.lang();
  }

  public role = (): string => {
    return this._config.role();
  }

  public sendNotifications = (): () => boolean => {
    return this._config.sendNotifications;
  }

  public sendWarnings = (): () => boolean => {
    return this._config.sendWarnings;
  }

  public paymentDate = (): () => Date => {
    return this._subscription.paymentDate;
  };

  public isNotified = (): () => boolean => {
    return this._subscription.isNotified;
  };

  public isWarned = (): () => boolean => {
    return this._subscription.isWarned;
  };

  public isActive = (): () => boolean => {
    return this._subscription.isActive;
  };
}