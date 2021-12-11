import { CustomError } from "../../../Shared/Domain/Error/CustomError";

export class KcalExceedTotalError extends CustomError {
  statusCode = 400;

  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, KcalExceedTotalError.prototype);
  }

  serialize() {
    return [ { message: this.message } ];
  }
}