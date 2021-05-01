import { CustomError } from '../CustomError';

export class FoodNotFitsError extends CustomError {
  statusCode = 400;

  constructor() {
    super(
      `This food can't be added due his kcal exceeds maximum kcal of the diet`
    );

    Object.setPrototypeOf(this, FoodNotFitsError.prototype);
  }

  serialize() {
    return [{ message: this.message }];
  }
}
