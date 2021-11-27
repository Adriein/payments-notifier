import { CriteriaObject } from "../../../Shared/Domain/types";

export class ReadCalculatedReportCommand {
  constructor(public adminId: string, public criteria?: CriteriaObject) {}
}
