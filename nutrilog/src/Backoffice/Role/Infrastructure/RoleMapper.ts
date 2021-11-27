import { IMapper } from "../../../Shared/Domain/Interfaces/IMapper";
import { Role } from "../Domain/Role";
import { ID } from "../../../Shared/Domain/VO/Id.vo";
import { Prisma } from "@prisma/client";


export class RoleMapper implements IMapper<Role, Prisma.roleCreateInput | Prisma.roleUpdateInput> {

  toDomain(dataModel: Prisma.roleWhereInput): Role {
    return new Role(
      new ID(dataModel.id! as string),
      dataModel.type! as string,
      dataModel.created_at! as Date,
      dataModel.updated_at! as Date
    )
  }

  toSaveDataModel(domain: Role): Prisma.roleCreateInput {
    throw new Error('not implemented yet');
  }

  toUpdateDataModel(domain: Role): Prisma.roleUpdateInput {
    throw new Error('not implemented yet');
  }
}