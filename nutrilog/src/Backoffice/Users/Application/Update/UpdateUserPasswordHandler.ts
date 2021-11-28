import { Log } from "../../../../Shared/Domain/Decorators/Log";
import { CommandHandler } from "../../../../Shared/Domain/Decorators/CommandHandler.decorator";
import { IUserRepository } from "../../Domain/IUserRepository";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { UserNotExistError } from "../../Domain/UserNotExistError";
import { UpdateUserPasswordCommand } from "../../Domain/Command/UpdateUserPasswordCommand";
import { CryptoService } from "../../../../Shared/Domain/Services/CryptoService";

@CommandHandler(UpdateUserPasswordCommand)
export class UpdateUserPasswordHandler implements IHandler<void> {
  constructor(private repository: IUserRepository, private crypto: CryptoService) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(command: UpdateUserPasswordCommand): Promise<void> {
    const userId = new ID(command.userId);
    const { newPassword, oldPassword } = command;
    const user = await this.repository.findOne(userId.value);

    if (!user) {
      throw new UserNotExistError(`User with id: ${userId.value} not exists`);
    }

    const allowed = this.crypto.compare(
      user.password(),
      oldPassword
    );

    if (!allowed) {
      throw new Error();
    }
  }
}