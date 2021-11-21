import { CustomError } from "../../../Shared/Domain/CustomError";

export class UserWithoutPricingError extends CustomError {
  statusCode = 400;

  constructor(username: string, id: string) {
    super(`User: ${username} with id: ${id} not have a pricing`);

    Object.setPrototypeOf(this, UserWithoutPricingError.prototype);
  }

  serialize() {
    return [ { message: this.message } ];
  }
}