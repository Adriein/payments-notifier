import { CriteriaObject } from "../../types";

export class UserChartCommand {
    constructor(public adminId: string, public criteria: CriteriaObject) {}
  }
  