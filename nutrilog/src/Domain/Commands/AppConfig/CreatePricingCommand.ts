export class CreatePricingCommand {
  constructor(
    public name: string,
    public duration: string,
    public price: string,
    public adminId: string,
  ) {}
}
