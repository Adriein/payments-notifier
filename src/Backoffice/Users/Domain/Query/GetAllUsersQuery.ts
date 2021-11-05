import { IQuery } from "../../../../Shared/Domain/Interfaces/IQuery";
import { FilterRequestDto } from "../../Application/FilterRequestDto";

export class GetAllUsersQuery implements IQuery {
  constructor(public filters: FilterRequestDto[], public adminId: string) {
  };
}
