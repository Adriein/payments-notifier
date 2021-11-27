import { CustomError } from "../../Domain/CustomError";


export class FieldNotMappedError extends CustomError {
  statusCode = 400;

  constructor(field: string) {
    super(`Field: ${field} is not mapped`);

    Object.setPrototypeOf(this, FieldNotMappedError.prototype);
  }

  serialize() {
    return [ { message: this.message } ];
  }
}