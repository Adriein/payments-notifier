import { CustomError } from "../../../../Shared/Domain/Error/CustomError";

export class UserNotExistError extends CustomError {
  statusCode = 400;

  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, UserNotExistError.prototype);
  }

  serialize() {
    return [ { message: this.message, key: 'user_not_exists_error' } ];
  }
}
