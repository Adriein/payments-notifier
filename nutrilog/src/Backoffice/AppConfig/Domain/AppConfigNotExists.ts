import { CustomError } from "../../../Shared/Domain/Error/CustomError";

export class AppConfigNotExists extends CustomError {
  statusCode = 400;

  constructor(adminId: string) {
    super(`App config for admin with id: ${adminId} not exists`);

    Object.setPrototypeOf(this, AppConfigNotExists.prototype);
  }

  serialize() {
    return [ { message: this.message } ];
  }
}