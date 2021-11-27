export class UpdatePricingCommand {
  constructor(
    public id: string,
    public name: string,
    public duration: number,
    public amount: number,
    public adminId: string
  ) {}
}