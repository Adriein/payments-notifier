import { CustomError } from '../CustomError';

export class NutritionNotExistsError extends CustomError {
  statusCode = 400;

  constructor() {
    super(
      `This user hasn't a nutrition`
    );

    Object.setPrototypeOf(this, NutritionNotExistsError.prototype);
  }

  serialize() {
    return [{ message: this.message }];
  }
}
