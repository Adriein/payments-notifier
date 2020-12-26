import { CustomError } from './CustomError';

export class LastPaymentDateError extends CustomError {
  statusCode = 500;

  constructor() {
    super('Last payment date must have a correct format of YYYY-MM-DD');

    Object.setPrototypeOf(this, LastPaymentDateError.prototype);
  }

  serialize() {
    return [{ message: this.message, field: 'LastPaymentDate on User' }];
  }
}
