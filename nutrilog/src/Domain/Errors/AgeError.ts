import { CustomError } from '../../Shared/Domain/CustomError';

export class AgeError extends CustomError {
  statusCode = 400;

  constructor() {
    super('Email must have the correct format');

    Object.setPrototypeOf(this, AgeError.prototype);
  }

  serialize() {
    return [ { message: this.message, field: 'Age on Nutrition in User' } ];
  }
}
