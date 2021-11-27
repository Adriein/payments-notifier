import { CustomError } from "../../../Shared/Domain/CustomError";

export class PricingNotExistsError extends CustomError {
  statusCode = 400;

  constructor(id: string) {
    super(`Pricing with id: ${id} not exists`);

    Object.setPrototypeOf(this, PricingNotExistsError.prototype);
  }

  serialize() {
    return [ { message: this.message } ];
  }
}