import { Log } from "../../../Shared/Domain/Decorators/Log";
import { CommandHandler } from "../../../Shared/Domain/Decorators/CommandHandler.decorator";
import { IUserRepository } from "../Domain/IUserRepository";
import { ID } from "../../../Shared/Domain/VO/Id.vo";
import { IHandler } from "../../../Shared/Domain/Interfaces/IHandler";
import { DeleteUserCommand } from "../Domain/Command/DeleteUserCommand";
import { UserNotExistError } from "../Domain/UserNotExistError";

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements IHandler<void> {
  constructor(private repository: IUserRepository) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(command: DeleteUserCommand): Promise<void> {
    const id = new ID(command.id);

    const user = await this.repository.findOne(id.value);

    if (!user) {
      throw new UserNotExistError(id.value);
    }

    user.deactivateUser();

    await this.repository.update(user);
  }
}