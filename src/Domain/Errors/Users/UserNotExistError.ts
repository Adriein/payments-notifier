import { CustomError } from '../CustomError';

export class UserNotExistError extends CustomError {
  statusCode = 400;

  constructor(username: string = 'usuario buscado por id') {
    super(`Usuario no encontrado: ${username}`);

    Object.setPrototypeOf(this, UserNotExistError.prototype);
  }

  serialize() {
    return [{ message: this.message }];
  }
}
