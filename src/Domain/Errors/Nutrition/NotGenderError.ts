import { GenderType } from '../../constants';
import { CustomError } from '../CustomError';

export class NotGenderError extends CustomError {
  statusCode = 400;

  constructor() {
    super(`Gender not setted`);

    Object.setPrototypeOf(this, NotGenderError.prototype);
  }

  serialize() {
    return [{ message: this.message, field: 'Gender on KcalCalculator' }];
  }
}
