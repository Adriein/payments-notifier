import { IQuery } from "../../../Shared/Domain/Interfaces/IQuery";

export class GetAllPricingQuery implements IQuery {
  constructor(public adminId: string) {}
}