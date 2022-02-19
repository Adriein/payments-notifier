import { User } from "./User.entity";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { Password } from "../../../../Shared/Domain/VO/Password.vo";
import { Email } from "../../../../Shared/Domain/VO/Email.vo";
import { UserConfig } from "./UserConfig.entity";
import { Client } from "./Client.entity";
import { TenantCreatedDomainEvent } from "../../Application/CreateTenant/TenantCreatedDomainEvent";
import { DomainEventsManager } from "../../../../Shared/Domain/Entities/DomainEventsManager";

export class Tenant extends User {
  public static build(
    name: string,
    password: Password,
    email: Email,
    adminId: ID,
    roleId: ID,
  ): Tenant {
    const tenant = new Tenant(
      ID.generate(),
      name,
      password,
      email,
      UserConfig.build(true, true),
      adminId,
      roleId,
      true
    );

    tenant.addEvent(new TenantCreatedDomainEvent(tenant.id()));
    DomainEventsManager.publishEvents(tenant.id());

    return tenant;
  }

  constructor(
    _id: ID,
    _name: string,
    _password: Password,
    _email: Email,
    _config: UserConfig,
    _adminId: ID,
    _roleId: ID,
    _active: boolean,
    _createdAt?: Date,
    _updatedAt?: Date
  ) {
    super(_id, _name, _password, _email, _config, _adminId, _roleId, _active, _createdAt, _updatedAt);
  }

  public registerClient(
    name: string,
    email: Email,
    roleId: ID,
  ): Client {
    return Client.build(name, email, this.id(), roleId);
  }
}