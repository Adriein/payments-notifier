import { AgeError } from '../Errors/AgeError';
import { ValueObject } from './ValueObject';

export class Age extends ValueObject {
  private age: number;
  private regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  constructor(age: number) {
    super();
    
    if (this.validate(age)) {
      throw new AgeError();
    }
    this.age = age;
  }

  public get value(): number {
    return this.age;
  }

  protected validate(age: number): boolean {
    return typeof age !== 'number' || !this.regex.test(age.toString());
  }
}
