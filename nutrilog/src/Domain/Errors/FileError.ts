import { CustomError } from '../../Shared/Domain/CustomError';

export class FileError extends CustomError {
  statusCode = 400;

  constructor(cause: string) {
    super(cause);

    Object.setPrototypeOf(this, FileError.prototype);
  }

  serialize() {
    return [ { message: this.message } ];
  }
}
