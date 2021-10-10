import { CustomError } from '../../Domain/Errors';

export class NotAuthorizedError extends CustomError {
  statusCode = 401;

  constructor() {
    super('Not Authorized');

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serialize() {
    return [{message: 'Not authorized'}];
  }
}