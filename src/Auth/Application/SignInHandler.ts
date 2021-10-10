import { IHandler } from "../../Shared/Domain/Interfaces/IHandler";
import { Auth } from "../Domain/Auth.entity";
import { SigninQuery } from "../Domain/Query/SigninQuery";
import { QueryHandler } from "../../Shared/Domain/Decorators/QueryHandler.decorator";
import { Log } from "../../Domain/Decorators/Log";
import { IAuthRepository } from "../Domain/IAuthRepository";
import { CryptoService } from "../../Shared/Domain/Services/CryptoService";
import { NotAuthorizedError } from "../Domain/NotAuthorizedError";

@QueryHandler(SigninQuery)
export class SignInHandler implements IHandler<Auth> {

  constructor(private repository: IAuthRepository, private crypto: CryptoService) {
  }

  @Log(process.env.LOG_LEVEL)
  public async handle(query: SigninQuery): Promise<Auth> {
    const {email, password} = query;

    const auth = await this.repository.findByEmail(email);

    if (!auth) {
      throw new NotAuthorizedError();
    }

    const validated = await this.crypto.compare(auth.password(), password);

    if (!validated) {
      throw new NotAuthorizedError();
    }

    return auth;
  }

}