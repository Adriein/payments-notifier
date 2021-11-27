import { IMapper } from "../../../Shared/Domain/Interfaces/IMapper";
import { Auth } from "../../Domain/Auth.entity";
import { AuthDAO } from "./Auth.dao";
import { ID } from "../../../Shared/Domain/VO/Id.vo";
import { Email } from "../../../Shared/Domain/VO/Email.vo";
import { Password } from "../../../Shared/Domain/VO/Password.vo";
import { IAuthModel } from "./IAuthModel";

export class AuthMapper implements IMapper<Auth, IAuthModel> {
  public toDataModel(domain: Auth): IAuthModel {
    throw new Error('Not implemented');
  }

  public toDomain(dataModel: IAuthModel): Auth {
    return new Auth(
      new ID(dataModel.id!),
      dataModel.username!,
      new Email(dataModel.email!),
      new Password(dataModel.password!)
    );
  }
}