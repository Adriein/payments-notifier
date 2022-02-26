import { DeactivateClientCommand } from "./DeactivateClientCommand";
import { CommandHandler } from "../../../../Shared/Domain/Decorators/CommandHandler.decorator";
import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { Log } from "../../../../Shared/Domain/Decorators/Log";
import { IClientRepository } from "../../Domain/IClientRepository";


@CommandHandler(DeactivateClientCommand)
export class DeactivateClientHandler implements IHandler<void> {
  constructor(private repository: IClientRepository) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(command: DeactivateClientCommand): Promise<void> {
    const id = new ID(command.id);

    const result = await this.repository.findOne(id.value);

    if (result.isLeft()) {
      throw result.value;
    }
    const user = result.value;

    await user.deactivate();

    await this.repository.update(user);
  }
}