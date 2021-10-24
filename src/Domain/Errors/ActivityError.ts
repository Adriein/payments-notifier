import { CustomError } from '../../Shared/Domain/CustomError';

export class ActivityError extends CustomError {
  statusCode = 400;

  constructor() {
    super('Email must have the correct format');

    Object.setPrototypeOf(this, ActivityError.prototype);
  }

  serialize() {
    return [ { message: this.message, field: 'Activity on Nutrition in User' } ];
  }
}
