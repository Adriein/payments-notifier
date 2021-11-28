import { IMapper } from "../../../Shared/Domain/Interfaces/IMapper";
import { Auth } from "../../Domain/Auth.entity";
import { ID } from "../../../Shared/Domain/VO/Id.vo";
import { Email } from "../../../Shared/Domain/VO/Email.vo";
import { Password } from "../../../Shared/Domain/VO/Password.vo";
import { Prisma } from "@prisma/client";

export class AuthMapper implements IMapper<Auth, Prisma.userCreateInput | Prisma.userUpdateInput> {
  public toDomain(dataModel: any): Auth {
    return new Auth(
      new ID(dataModel.id!),
      dataModel.username!,
      new Email(dataModel.email!),
      new Password(dataModel.password!)
    );
  }

  toSaveDataModel(domain: Auth): Prisma.userCreateInput | Prisma.userUpdateInput {
    throw new Error('not implemented yet');
  }

  toUpdateDataModel<C extends Prisma.userUpdateInput>(domain: Auth): Prisma.userUpdateInput {
    throw new Error();
  }
}