import { CustomError } from "../../../Shared/Domain/Error/CustomError";

export class NoActiveSubscriptionError extends CustomError {
  statusCode = 400;

  constructor() {
    super('Not active subscription exists');

    Object.setPrototypeOf(this, NoActiveSubscriptionError.prototype);
  }

  serialize() {
    return [ { message: this.message, key: 'user_already_exists_error' } ];
  }
}
