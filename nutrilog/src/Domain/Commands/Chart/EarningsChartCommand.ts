import { CriteriaObject } from "../../../Shared/Domain/types";

export class EarningsChartCommand {
    constructor(public adminId: string, public criteria: CriteriaObject) {}
  }
  