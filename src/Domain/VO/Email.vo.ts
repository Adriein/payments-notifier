import { EmailError } from '../Errors';

export class Email {
  private regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  private email: string;
  constructor(email: string) {
    if (typeof email !== 'string' || !this.regex.test(email)) {
      throw new EmailError();
    }
    this.email = email;
  }

  public get value(): string {
    return this.email;
  }
}
