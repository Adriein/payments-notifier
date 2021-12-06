import { DeleteUserCommand } from "../../Domain/Command/DeleteUserCommand";
import { CommandHandler } from "../../../../Shared/Domain/Decorators/CommandHandler.decorator";
import { IUserRepository } from "../../Domain/IUserRepository";
import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { UserNotExistError } from "../../Domain/UserNotExistError";
import { Log } from "../../../../Shared/Domain/Decorators/Log";


@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler implements IHandler<void> {
  constructor(private repository: IUserRepository) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(command: DeleteUserCommand): Promise<void> {
    const id = new ID(command.id);

    const result = await this.repository.findOne(id.value);

    if (result.isLeft()) {
      throw result.value;
    }
    const user = result.value;
    
    user.deactivate();

    await this.repository.update(user);
  }
}