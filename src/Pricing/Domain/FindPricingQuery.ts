import { Criteria } from "../../Shared/Domain/Entities/Criteria";

export class FindPricingQuery {
  constructor(public criteria: Criteria) {
  }
}