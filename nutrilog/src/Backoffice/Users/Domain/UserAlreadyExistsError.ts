import { CustomError } from "../../../Shared/Domain/Error/CustomError";

export class UserAlreadyExistsError extends CustomError {
  statusCode = 400;

  constructor() {
    super('This user already exists');

    Object.setPrototypeOf(this, UserAlreadyExistsError.prototype);
  }

  serialize() {
    return [ { message: this.message, key: 'user_already_exists_error' } ];
  }
}
