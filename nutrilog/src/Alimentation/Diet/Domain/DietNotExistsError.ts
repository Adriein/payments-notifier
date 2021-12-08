import { CustomError } from "../../../Shared/Domain/Error/CustomError";

export class DietNotExistsError extends CustomError {
  statusCode = 400;

  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, DietNotExistsError.prototype);
  }

  serialize() {
    return [ { message: this.message } ];
  }
}
