import { IQuery } from "../../../../Shared/Domain/Interfaces/IQuery";
import { Criteria } from "../../../../Shared/Domain/Entities/Criteria";

export class GetAllUsersQuery implements IQuery {
  constructor(public criteria: Criteria, public adminId: string) {
  };
}
