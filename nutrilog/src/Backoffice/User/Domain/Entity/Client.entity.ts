import { User } from "./User.entity";
import { Password } from "../../../../Shared/Domain/VO/Password.vo";
import { Email } from "../../../../Shared/Domain/VO/Email.vo";
import { UserConfig } from "./UserConfig.entity";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";

export class Client extends User {
  public static build(
    name: string,
    email: Email,
    tenantId: ID,
    roleId: ID,
  ): Client {
    return new Client(ID.generate(), name, Password.generate(), email, UserConfig.build(), tenantId, roleId, true);
  }

  constructor(
    _id: ID,
    _name: string,
    _password: Password,
    _email: Email,
    _config: UserConfig,
    _tenantId: ID,
    _roleId: ID,
    _active: boolean,
    _createdAt?: Date,
    _updatedAt?: Date
  ) {
    super(_id, _name, _password, _email, _config, _tenantId, _roleId, _active, _createdAt, _updatedAt);
  }

  public changeRole(roleId: ID): void {
    this._roleId = roleId;
    this.entityUpdated();
  }
}