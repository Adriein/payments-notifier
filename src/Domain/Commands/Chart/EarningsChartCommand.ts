import { CriteriaObject } from "../../types";

export class EarningsChartCommand {
    constructor(public adminId: string, public criteria: CriteriaObject) {}
  }
  