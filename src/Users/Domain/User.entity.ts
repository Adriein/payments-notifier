import { AggregateRoot } from "../../Shared/Domain/Entities/AggregateRoot";
import { Email } from "../../Shared/Domain/VO/Email.vo";
import { UserConfig } from "../../Domain/Entities/UserConfig.entity";
import { ID } from "../../Shared/Domain/VO/Id.vo";
import { Password } from "../../Shared/Domain/VO/Password.vo";
import { Subscription } from "./Subscription.entity";

export class User extends AggregateRoot {
  public static build(
    ownerId: ID,
    name: string,
    password: Password,
    email: Email,
    config: UserConfig,
    subscription: Subscription
  ): User {
    return new User(ID.generate(), name, email, config, ownerId);
  }

  constructor(
    _id: ID,
    private _name: string,
    private _email: Email,
    private _config: UserConfig,
    private _ownerId?: ID
  ) {
    super(_id);
  }
}