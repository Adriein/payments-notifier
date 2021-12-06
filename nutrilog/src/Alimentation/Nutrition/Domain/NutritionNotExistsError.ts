import { CustomError } from "../../../Shared/Domain/Error/CustomError";

export class NutritionNotExistsError extends CustomError {
  statusCode = 400;

  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, NutritionNotExistsError.prototype);
  }

  serialize() {
    return [ { message: this.message } ];
  }
}
