import { Password } from "../../Shared/Domain/VO/Password.vo";
import { Email } from "../../Shared/Domain/VO/Email.vo";
import { AggregateRoot } from "../../Shared/Domain/Entities/AggregateRoot";
import { ID } from "../../Shared/Domain/VO/Id.vo";

export class Auth extends AggregateRoot {
  public static build(name: string, email: Email, password: Password) {
    return new Auth(ID.generate(), name, email, password)
  }

  constructor(_id: ID, private _name: string, private _email: Email, private _password: Password) {
    super(_id);
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
}