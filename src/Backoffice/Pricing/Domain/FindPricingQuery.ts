import { Criteria } from "../../../Shared/Domain/Entities/Criteria";
import { IQuery } from "../../../Shared/Domain/Interfaces/IQuery";

export class FindPricingQuery implements IQuery {
  constructor(public criteria: Criteria) {
  }
}