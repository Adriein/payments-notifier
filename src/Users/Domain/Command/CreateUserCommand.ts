import { ICommand } from "../../../Shared/Domain/Interfaces/ICommand";

export class CreateUserCommand implements ICommand {
  constructor(
    public username: string,
    public email: string,
    public pricing: string,
    public lastPaymentDate: string,
    public adminId: string,
  ) {
  }
}