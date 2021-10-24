import { CustomError } from '../../../Shared/Domain/CustomError';

export class AppConfigNotExistsError extends CustomError {
  statusCode = 400;

  constructor() {
    super('Not exist app config for this admin');

    Object.setPrototypeOf(this, AppConfigNotExistsError.prototype);
  }

  serialize() {
    return [ { message: this.message } ];
  }
}
