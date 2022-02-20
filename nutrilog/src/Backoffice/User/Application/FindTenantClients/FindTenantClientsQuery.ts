import { IQuery } from "../../../../Shared/Domain/Interfaces/IQuery";
import { FilterRequestDto } from "./FilterRequestDto";

export class FindTenantClientsQuery implements IQuery {
  constructor(
    public filters: FilterRequestDto[],
    public tenantId: string,
    public page: number,
    public quantity: number
  ) {};
}
