import { ICommand } from "../../../../Shared/Domain/Interfaces/ICommand";

export class CreateClientCommand implements ICommand {
  constructor(
    public username: string,
    public email: string,
    public pricingId: string,
    public pricingDuration: number,
    public lastPaymentDate: string,
    public tenantId: string,
  ) {}
}