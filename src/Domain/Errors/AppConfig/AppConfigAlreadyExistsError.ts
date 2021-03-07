import { CustomError } from '../CustomError';

export class AppConfigAlreadyExistsError extends CustomError {
  statusCode = 400;

  constructor() {
    super('This app config already exists for this admin');

    Object.setPrototypeOf(this, AppConfigAlreadyExistsError.prototype);
  }

  serialize() {
    return [{ message: this.message }];
  }
}
