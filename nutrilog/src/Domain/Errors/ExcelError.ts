import { CustomError } from '../../Shared/Domain/CustomError';

export class ExcelError extends CustomError {
  statusCode = 500;

  constructor(cause: string) {
    super(cause);

    Object.setPrototypeOf(this, ExcelError.prototype);
  }

  serialize() {
    return [ { message: this.message } ];
  }
}
