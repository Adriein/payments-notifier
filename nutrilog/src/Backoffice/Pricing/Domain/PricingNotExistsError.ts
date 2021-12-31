import { CustomError } from "../../../Shared/Domain/Error/CustomError";

export class PricingNotExistsError extends CustomError {
  statusCode = 400;

  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, PricingNotExistsError.prototype);
  }

  serialize() {
    return [ { message: this.message, key: 'pricing_not_exists_error' } ];
  }
}