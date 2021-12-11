import { BaseEntity } from "../../../Shared/Domain/Entities/BaseEntity";
import { ID } from "../../../Shared/Domain/VO/Id.vo";


export class ApiUsage extends BaseEntity {
  public static build(adminId: ID, calls: number): ApiUsage {
    return new ApiUsage(ID.generate(), adminId, calls);
  }

  constructor(_id: ID, private _adminId: ID, private _apiCalls: number, _dateCreated?: Date, _dateUpdated?: Date) {
    super(_id, _dateCreated, _dateUpdated);
  }

  public adminId(): string {
    return this._adminId.value;
  }

  public apiCalls(): number {
    return this._apiCalls;
  }
}
