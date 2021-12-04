import { CustomError } from "../../../Shared/Domain/Error/CustomError";

export class AppConfigNotExists extends CustomError {
  statusCode = 400;

  constructor(id: string) {
    super(`App config for admin with id: ${id} not exists`);

    Object.setPrototypeOf(this, AppConfigNotExists.prototype);
  }

  serialize() {
    return [ { message: this.message } ];
  }
}