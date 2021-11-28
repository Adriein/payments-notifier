import { CustomError } from "../../../Shared/Domain/CustomError";

export class UserNotExistError extends CustomError {
  statusCode = 400;

  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, UserNotExistError.prototype);
  }

  serialize() {
    return [ { message: this.message } ];
  }
}
