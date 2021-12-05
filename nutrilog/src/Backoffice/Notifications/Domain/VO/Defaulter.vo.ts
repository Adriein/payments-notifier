import { Email } from "../../../../Shared/Domain/VO/Email.vo";

export class Defaulter {
  constructor(private _name: string, private _email: Email) {}


  public name(): string {
    return this._name;
  }

  public email(): string {
    return this._email.value;
  }
}