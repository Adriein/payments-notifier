import { ICommand } from "../../../../Shared/Domain/Interfaces/ICommand";

export class UpdatePaymentCommand implements ICommand {
  public constructor(public userId: string, public pricingId: string, public paymentDate: string) {
  }
}