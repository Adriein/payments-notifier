import { CriteriaObject } from "../../../Shared/Domain/types";

export class UserChartCommand {
    constructor(public adminId: string, public criteria: CriteriaObject) {}
  }
  