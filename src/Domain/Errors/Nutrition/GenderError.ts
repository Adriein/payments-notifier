import { GenderType } from '../../constants';
import { CustomError } from '../CustomError';

export class GenderError extends CustomError {
  statusCode = 400;

  constructor() {
    super(`Gender must be one of the following values: ${Object.values(GenderType).join(',')}`);

    Object.setPrototypeOf(this, GenderError.prototype);
  }

  serialize() {
    return [{ message: this.message, field: 'Gender on Nutrition in User' }];
  }
}
