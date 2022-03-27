import { Log } from "../../../../Shared/Domain/Decorators/Log";
import { CommandHandler } from "../../../../Shared/Domain/Decorators/CommandHandler.decorator";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { Email } from "../../../../Shared/Domain/VO/Email.vo";
import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { IQueryBus } from "../../../../Shared/Domain/Bus/IQueryBus";
import { SearchRoleQuery } from "../../../Role/Domain/SearchRoleQuery";
import { SearchRoleResponse } from "../../../Role/Application/SearchRoleResponse";
import { IClientRepository } from "../../Domain/IClientRepository";
import { UpdateClientCommand } from "./UpdateClientCommand";
import { Client } from "../../Domain/Entity/Client.entity";

@CommandHandler(UpdateClientCommand)
export class UpdateClientHandler implements IHandler<void> {
  constructor(
    private readonly clientRepository: IClientRepository,
    private readonly queryBus: IQueryBus,
  ) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(command: UpdateClientCommand): Promise<void> {
    const id = new ID(command.clientId);
    const email = new Email(command.email);

    const role = await this.getRole(command.rol);
    const client = await this.getClient(id);

    client.changePersonalInfo(command.username, email);
    client.changeConfig(command.warnings, command.notifications, command.language);
    client.changeRole(new ID(role.id));

    await this.clientRepository.update(client);
  }

  private async getRole(role: string): Promise<SearchRoleResponse> {
    return await this.queryBus.ask(new SearchRoleQuery(role));
  }

  private async getClient(id: ID): Promise<Client> {
    const result = await this.clientRepository.findOne(id.value);

    if (result.isLeft()) {
      throw result;
    }

    return result.value;
  }
}