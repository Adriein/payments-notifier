import { Log } from "../../Shared/Domain/Decorators/Log";
import { CommandHandler } from "../../Shared/Domain/Decorators/CommandHandler.decorator";
import { ID } from "../../Shared/Domain/VO/Id.vo";
import { IHandler } from "../../Shared/Domain/Interfaces/IHandler";
import { UpdatePasswordCommand } from "../Domain/Command/UpdatePasswordCommand";
import { CryptoService } from "../../Shared/Domain/Services/CryptoService";
import { IAuthRepository } from "../Domain/IAuthRepository";
import { NotAllowedToChangePasswordError } from "../Domain/NotAllowedToChangePasswordError";
import { Auth } from "../Domain/Auth.entity";
import { Email } from "../../Shared/Domain/VO/Email.vo";
import { Password } from "../../Shared/Domain/VO/Password.vo";

@CommandHandler(UpdatePasswordCommand)
export class UpdatePasswordHandler implements IHandler<void> {
  constructor(private repository: IAuthRepository, private crypto: CryptoService) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(command: UpdatePasswordCommand): Promise<void> {
    const userId = new ID(command.userId);
    const { newPassword, oldPassword } = command;
    const auth = await this.repository.findOne(userId.value);

    if (!auth) {
      throw new NotAllowedToChangePasswordError();
    }

    const allowed = this.crypto.compare(
      auth.password(),
      oldPassword
    );

    if (!allowed) {
      throw new NotAllowedToChangePasswordError();
    }

    const password = await this.crypto.hash(newPassword);

    const updatedAuth = new Auth(new ID(auth.id()), auth.name(), new Email(auth.email()), new Password(password));

    await this.repository.update(updatedAuth);
  }
}