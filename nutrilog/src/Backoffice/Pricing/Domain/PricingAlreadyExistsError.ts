import { CustomError } from "../../../Shared/Domain/Error/CustomError";

export class PricingAlreadyExistsError extends CustomError {
  statusCode = 400;

  constructor(name: string) {
    super(`Pricing ${name} already exists`);

    Object.setPrototypeOf(this, PricingAlreadyExistsError.prototype);
  }

  serialize() {
    return [ { message: this.message, key: 'pricing_already_exists_error' } ];
  }
}