import { CustomError } from "../../../Shared/Domain/CustomError";

export class UserNotExistError extends CustomError {
  statusCode = 400;

  constructor(username: string) {
    super(`User not exist: ${username}`);

    Object.setPrototypeOf(this, UserNotExistError.prototype);
  }

  serialize() {
    return [ { message: this.message } ];
  }
}
