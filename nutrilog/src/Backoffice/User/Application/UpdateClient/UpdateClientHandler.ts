import { Log } from "../../../../Shared/Domain/Decorators/Log";
import { CommandHandler } from "../../../../Shared/Domain/Decorators/CommandHandler.decorator";
import { ID } from "../../../../Shared/Domain/VO/Id.vo";
import { Email } from "../../../../Shared/Domain/VO/Email.vo";
import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { UserAlreadyExistsError } from "../../Domain/Error/UserAlreadyExistsError";
import { IQueryBus } from "../../../../Shared/Domain/Bus/IQueryBus";
import { SearchRoleQuery } from "../../../Role/Domain/SearchRoleQuery";
import { SearchRoleResponse } from "../../../Role/Application/SearchRoleResponse";
import { CLIENT_ROLE } from "../../Domain/constants";
import { DateVo } from "../../../../Shared/Domain/VO/Date.vo";
import { ISubscriptionRepository } from "../../Domain/ISubscriptionRepository";
import { Tenant } from "../../Domain/Entity/Tenant.entity";
import { IClientRepository } from "../../Domain/IClientRepository";
import { TenantFinder } from "../Service/TenantFinder";
import { UpdateClientCommand } from "./UpdateClientCommand";

@CommandHandler(UpdateClientCommand)
export class UpdateClientHandler implements IHandler<void> {
  constructor(
    private readonly clientRepository: IClientRepository,
    private readonly queryBus: IQueryBus,
    private readonly finder: TenantFinder,
  ) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(command: UpdateClientCommand): Promise<void> {
    const email = new Email(command.email);
    await this.ensureUserNotExists(email);

    const role = await this.getUserRole();

    const tenant = await this.findTenant(command.tenantId);

    const client = tenant.registerClient(command.username, email, new ID(role.id));

    await this.clientRepository.save(client);

  }

  private async findTenant(id: string): Promise<Tenant> {
    return await this.finder.execute(new ID(id));
  }

  private async ensureUserNotExists(email: Email): Promise<void> {
    const result = await this.clientRepository.findByEmail(email.value);

    if (result.isRight()) {
      throw new UserAlreadyExistsError();
    }
  }

  private async getUserRole(): Promise<SearchRoleResponse> {
    return await this.queryBus.ask(new SearchRoleQuery(CLIENT_ROLE));
  }
}