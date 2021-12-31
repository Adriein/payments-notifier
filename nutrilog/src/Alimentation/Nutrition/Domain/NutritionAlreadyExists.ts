import { CustomError } from "../../../Shared/Domain/Error/CustomError";

export class NutritionAlreadyExists extends CustomError {
  statusCode = 400;

  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, NutritionAlreadyExists.prototype);
  }

  serialize() {
    return [ { message: this.message, key: 'nutrition_already_exists_error' } ];
  }
}
