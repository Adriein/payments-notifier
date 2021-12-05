import { BaseEntity } from "../../../Shared/Domain/Entities/BaseEntity";
import { ID } from "../../../Shared/Domain/VO/Id.vo";

export class Role extends BaseEntity {
  public static build(role: string): Role {
    return new Role(ID.generate(), role)
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