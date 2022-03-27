import { Log } from "../../../../Shared/Domain/Decorators/Log";
import { CommandHandler } from "../../../../Shared/Domain/Decorators/CommandHandler.decorator";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { Email } from "../../../../Shared/Domain/VO/Email.vo";
import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { IClientRepository } from "../../Domain/IClientRepository";
import { UpdateClientCommand } from "./UpdateClientCommand";
import { Client } from "../../Domain/Entity/Client.entity";

@CommandHandler(UpdateClientCommand)
export class UpdateClientHandler implements IHandler<void> {
  constructor(private readonly clientRepository: IClientRepository) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(command: UpdateClientCommand): Promise<void> {
    const id = new ID(command.clientId);
    const email = new Email(command.email);

    const client = await this.getClient(id);

    client.changePersonalInfo(command.username, email);
    client.changeConfig(command.warnings, command.notifications, command.language);

    await this.clientRepository.update(client);
  }

  private async getClient(id: ID): Promise<Client> {
    const result = await this.clientRepository.findOne(id.value);

    if (result.isLeft()) {
      throw result;
    }

    return result.value;
  }
}