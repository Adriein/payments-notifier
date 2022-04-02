import { ICommand } from "../../../../Shared/Domain/Interfaces/ICommand";

export class RenewSubscriptionCommand implements ICommand {
  public constructor(
    public userId: string,
    public pricingId: string,
    public paymentDate: string
  ) {
  }
}