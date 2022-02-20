import { User } from "./User.entity";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { Password } from "../../../../Shared/Domain/VO/Password.vo";
import { Email } from "../../../../Shared/Domain/VO/Email.vo";
import { UserConfig } from "./UserConfig.entity";
import { Client } from "./Client.entity";
import { TenantCreatedDomainEvent } from "../DomainEvents/TenantCreatedDomainEvent";
import { DomainEventsManager } from "../../../../Shared/Domain/Entities/DomainEventsManager";
import { SubscriptionCollection } from "./SubscriptionCollection";
import { ReportGeneratedDomainEvent } from "../DomainEvents/ReportGeneratedDomainEvent";

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

  public generateReport(clientList: Client[], subscriptionCollection: SubscriptionCollection): void {
    const newDefaulters = [];
    const oldDefaulters = [];

    const subscriptionExpiredToday = new SubscriptionCollection(subscriptionCollection.getExpiredSubscriptionsToday());

    for (const client of clientList) {
      if (subscriptionExpiredToday.containsClient(client.id())) {
        newDefaulters.push({ name: client.name(), email: client.email() });
        continue;
      }

      oldDefaulters.push({ name: client.name(), email: client.email() })
    }

    this.addEvent(new ReportGeneratedDomainEvent(
      this.id(),
      oldDefaulters,
      newDefaulters,
      subscriptionCollection.size()
    ));

    DomainEventsManager.publishEvents(this.id());
  }
}