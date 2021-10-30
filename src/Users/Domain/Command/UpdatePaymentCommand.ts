export class UpdatePaymentCommand {
  public constructor(public userId: string, public pricingId: string, public paymentDate: string) {
  }
}