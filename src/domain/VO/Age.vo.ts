import { AgeError } from "../errors/AgeError";

export class Age {
  private regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  constructor(public age: number) {
    if (typeof age !== 'number' || !this.regex.test(age.toString())) {
      throw new AgeError();
    }
  }
}