import { AgeError } from '../Errors/Nutrition/AgeError';

export class Age {
  private age: number;
  private regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  constructor(age: number) {
    if (typeof age !== 'number' || !this.regex.test(age.toString())) {
      throw new AgeError();
    }
    this.age = age;
  }

  public get value(): number {
    return this.age;
  }
}
