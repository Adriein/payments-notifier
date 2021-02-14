import { CustomError } from '../CustomError';

export class EmailError extends CustomError {
  statusCode = 400;

  constructor() {
    super('Email must have the correct format');

    Object.setPrototypeOf(this, EmailError.prototype);
  }

  serialize() {
    return [{ message: this.message, field: 'Email on User' }];
  }
}
