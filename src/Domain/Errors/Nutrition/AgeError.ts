import { CustomError } from '../CustomError';

export class AgeError extends CustomError {
  statusCode = 400;

  constructor() {
    super('Age must be a value between 18 and 99 years old');

    Object.setPrototypeOf(this, AgeError.prototype);
  }

  serialize() {
    return [{ message: this.message, field: 'Age on Nutrition in User' }];
  }
}
