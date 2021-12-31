import { CustomError } from "../../Shared/Domain/Error/CustomError";


export class NotRegisteredError extends CustomError {
  statusCode = 401;

  constructor() {
    super('Not registered');

    Object.setPrototypeOf(this, NotRegisteredError.prototype);
  }

  serialize() {
    return [ { message: 'Not registered', key: 'not_registered_error' } ];
  }
}