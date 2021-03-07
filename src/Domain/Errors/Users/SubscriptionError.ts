import { CustomError } from '../CustomError';

export class SubscriptionError extends CustomError {
  statusCode = 400;

  constructor() {
    super("This user hasn't a subscription");

    Object.setPrototypeOf(this, SubscriptionError.prototype);
  }

  serialize() {
    return [{ message: this.message, field: 'Subscription on User' }];
  }
}
