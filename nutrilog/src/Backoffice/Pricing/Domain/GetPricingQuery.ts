import { IQuery } from "../../../Shared/Domain/Interfaces/IQuery";

export class GetPricingQuery implements IQuery {
  constructor(public id: string) {
  }
}