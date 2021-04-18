import { NutritionalObjectiveType } from '../../constants';
import { CustomError } from '../CustomError';

export class NutritionObjectiveError extends CustomError {
  statusCode = 400;

  constructor() {
    super(`Objective must be one of the following values: ${Object.values(NutritionalObjectiveType).join(',')}`);

    Object.setPrototypeOf(this, NutritionObjectiveError.prototype);
  }

  serialize() {
    return [{ message: this.message, field: 'Objective on Nutrition in User' }];
  }
}
