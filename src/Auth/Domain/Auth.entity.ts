import { Password } from "../../Shared/Domain/VO/Password.vo";
import { Email } from "../../Shared/Domain/VO/Email.vo";
import { AggregateRoot } from "../../Shared/Domain/Entities/AggregateRoot";
import { ID } from "../../Shared/Domain/VO/Id.vo";
import { AdminCreatedDomainEvent } from "./AdminCreatedDomainEvent";

export class Auth extends AggregateRoot {
  constructor(private name: string, private email: Email, private password: Password) {
    super(ID.generate());

    this.addEvent(new AdminCreatedDomainEvent(this.id(), name, email.value, password.value));
  }
}