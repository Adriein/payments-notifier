import { IMapper } from "../../../Shared/Domain/Interfaces/IMapper";
import { Role } from "../Domain/Role";
import { IRoleModel } from "./IRoleModel";
import { ID } from "../../../Shared/Domain/VO/Id.vo";


export class RoleMapper implements IMapper<Role, IRoleModel> {
  toDataModel(domain: Role): IRoleModel {
    throw new Error();
  }

  toDomain(dataModel: IRoleModel): Role {
    return new Role(
      new ID(dataModel.id),
      dataModel.type,
      dataModel.created_at,
      dataModel.updated_at
    )
  }
}