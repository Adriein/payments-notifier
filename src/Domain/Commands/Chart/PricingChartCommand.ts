import { CriteriaObject } from "../../types";

export class PricingChartCommand {
    constructor(public adminId: string, public criteria: CriteriaObject) {}
  }
  