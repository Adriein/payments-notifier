import { CustomError } from '../CustomError';

export class NutritionAlreadyExistsError extends CustomError {
  statusCode = 400;

  constructor() {
    super(
      `This user already has a nutrition plan`
    );

    Object.setPrototypeOf(this, NutritionAlreadyExistsError.prototype);
  }

  serialize() {
    return [{ message: this.message }];
  }
}
