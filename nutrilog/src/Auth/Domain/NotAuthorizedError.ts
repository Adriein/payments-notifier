import { CustomError } from "../../Shared/Domain/Error/CustomError";


export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor() {
    super('Not Authorized');

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serialize() {
    return [ { message: 'Not authorized', key: 'not_authorized_error' } ];
  }
}