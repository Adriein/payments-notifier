import { Log } from "../../../../Shared/Domain/Decorators/Log";
import { CommandHandler } from "../../../../Shared/Domain/Decorators/CommandHandler.decorator";
import { IUserRepository } from "../../Domain/IUserRepository";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { UserNotExistError } from "../../Domain/UserNotExistError";
import { UpdateUserNotificationsCommand } from "../../Domain/Command/UpdateUserNotificationsCommand";

@CommandHandler(UpdateUserNotificationsCommand)
export class UpdateUserNotificationsHandler implements IHandler<void> {
  constructor(private repository: IUserRepository) {
  }

  @Log(process.env.LOG_LEVEL)
  public async handle(command: UpdateUserNotificationsCommand): Promise<void> {
    const id = new ID(command.id);
    const canSendWarnings = Boolean(command.sendWarnings);

    const user = await this.repository.findOne(id.value);

    if (!user) {
      throw new UserNotExistError(id.value);
    }

    user.acceptWarnings(canSendWarnings);

    await this.repository.update(user);
  }
}