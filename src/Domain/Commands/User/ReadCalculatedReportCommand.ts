import { CriteriaObject } from "../../types";

export class ReadCalculatedReportCommand {
  constructor(public adminId: string, public criteria?: CriteriaObject) {}
}
