import { CustomError } from "../../Shared/Domain/Error/CustomError";

export class NotAllowedToChangePasswordError extends CustomError {
  statusCode = 401;

  constructor() {
    super('Not allowed to change password');

    Object.setPrototypeOf(this, NotAllowedToChangePasswordError.prototype);
  }

  serialize() {
    return [ { message: 'Not allowed to change password', key: 'not_allowed_to_change_password_error' } ];
  }
}