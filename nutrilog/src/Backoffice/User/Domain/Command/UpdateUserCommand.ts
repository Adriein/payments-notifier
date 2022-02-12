import { ICommand } from "../../../../Shared/Domain/Interfaces/ICommand";

export class UpdateUserCommand implements ICommand {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public pricingId: string,
    public lastPaymentDate: string,
    public adminId: string,
  ) {}
}