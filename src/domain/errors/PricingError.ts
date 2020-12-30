import { CustomError } from './CustomError';

export class PricingError extends CustomError {
  statusCode = 400;

  constructor() {
    super('Pricing must be one of the following values: monthly or quarterly');

    Object.setPrototypeOf(this, PricingError.prototype);
  }

  serialize() {
    return [{ message: this.message, field: 'Pricing on User' }];
  }
}
