import { IQuery } from "../../../../Shared/Domain/Interfaces/IQuery";
import { FilterRequestDto } from "../../Application/Find/FilterRequestDto";

export class FindUsersQuery implements IQuery {
  constructor(
    public filters: FilterRequestDto[],
    public adminId: string,
    public page: number,
    public quantity: number
  ) {};
}
