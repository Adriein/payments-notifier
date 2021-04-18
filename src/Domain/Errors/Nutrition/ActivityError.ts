import { ActivityType } from '../../constants';
import { CustomError } from '../CustomError';

export class ActivityError extends CustomError {
  statusCode = 400;

  constructor() {
    super(`Activity must be one of the following values: ${Object.values(ActivityType).join(',')}`);

    Object.setPrototypeOf(this, ActivityError.prototype);
  }

  serialize() {
    return [{ message: this.message, field: 'Activity on Nutrition in User' }];
  }
}
