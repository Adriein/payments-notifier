import { CriteriaObject } from "../../../Shared/Domain/types";

export class PricingChartCommand {
    constructor(public adminId: string, public criteria: CriteriaObject) {}
  }
  