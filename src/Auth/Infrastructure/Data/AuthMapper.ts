import { IMapper } from "../../../Shared/Domain/Interfaces/IMapper";
import { Auth } from "../../Domain/Auth.entity";
import { AuthDAO } from "./Auth.dao";
import { ID } from "../../../Shared/Domain/VO/Id.vo";
import { Email } from "../../../Shared/Domain/VO/Email.vo";
import { Password } from "../../../Shared/Domain/VO/Password.vo";

export class AuthMapper implements IMapper<Auth, AuthDAO> {
  public datamodel(domain: Auth): AuthDAO {
    throw new Error('Not implemented');
  }

  public domain(datamodel: AuthDAO): Auth {
    return new Auth(
      new ID(datamodel.id!),
      datamodel.username!,
      new Email(datamodel.email!),
      new Password(datamodel.password!)
    );
  }
}