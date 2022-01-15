import { CustomError } from "../../Domain/Error/CustomError";


export class JoinTypeMissingError extends CustomError {
  statusCode = 400;

  constructor() {
    super(`Property joinType is not defined in model schema that represents a join`);

    Object.setPrototypeOf(this, JoinTypeMissingError.prototype);
  }

  serialize() {
    return [ { message: this.message, key: 'property_not_defined_in_model_error' } ];
  }
}