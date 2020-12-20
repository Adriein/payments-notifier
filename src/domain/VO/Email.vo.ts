import { EmailError } from '../errors';

export class Email {
  private regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  constructor(public email: string) {
    if (typeof email !== 'string' || !this.regex.test(email)) {
      throw new EmailError();
    }
  }
}
