import { PricingObject } from "../../types";

export class IngestDefaultersCommand {
  constructor(
    public name: string,
    public email: string,
    public pricing: PricingObject,
    public lastPayment: string
  ) {}
}
