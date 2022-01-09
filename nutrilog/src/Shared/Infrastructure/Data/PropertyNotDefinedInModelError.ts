import { CustomError } from "../../Domain/Error/CustomError";


export class PropertyNotDefinedInModelError extends CustomError {
  statusCode = 400;

  constructor(prop: string) {
    super(`Property ${prop} not defined in model`);

    Object.setPrototypeOf(this, PropertyNotDefinedInModelError.prototype);
  }

  serialize() {
    return [ { message: this.message, key: 'property_not_defined_in_model_error' } ];
  }
}