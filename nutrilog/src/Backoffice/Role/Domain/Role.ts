import { BaseEntity } from "../../../Shared/Domain/Entities/BaseEntity";
import { ID } from "../../../Shared/Domain/VO/Id.vo";
import { USER_ROLE } from "../../../Domain/constants";

export class Role extends BaseEntity {
  public static build(): Role {
    return new Role(new ID('3438c550-374b-47af-88c9-d880fedfec59'), USER_ROLE)
  }

  constructor(
    _id: ID,
    private _type: string,
    _createdAt?: Date,
    _updatedAt?: Date
  ) {
    super(_id, _createdAt, _updatedAt);
  }

  public type(): string {
    return this._type;
  }
}