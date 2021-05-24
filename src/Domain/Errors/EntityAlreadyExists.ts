import { CustomError } from './CustomError';

export class EntityAlreadyExistsError extends CustomError {
  statusCode = 400;

  constructor(message?: string) {
    super(message? message : 'This entity already exists');

    Object.setPrototypeOf(this, EntityAlreadyExistsError.prototype);
  }

  serialize() {
    return [{ message: this.message }];
  }
}