import { CustomError } from './CustomError';

export class EntityNotExistsError extends CustomError {
  statusCode = 400;

  constructor(message?: string) {
    super(message? message : 'This entity not exists');

    Object.setPrototypeOf(this, EntityNotExistsError.prototype);
  }

  serialize() {
    return [{ message: this.message }];
  }
}