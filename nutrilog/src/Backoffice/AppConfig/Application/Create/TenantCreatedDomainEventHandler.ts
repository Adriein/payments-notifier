import { IDomainEventHandler } from "../../../../Shared/Domain/Interfaces/IDomainEventHandler";
import { DomainEventsHandler } from "../../../../Shared/Domain/Decorators/DomainEventsHandler.decorator";
import { AppConfig } from "../../Domain/AppConfig.entity";
import { IAppConfigRepository } from "../../Domain/IAppConfigRepository";
import { TenantCreatedDomainEvent } from "../../../User/Application/CreateTenant/TenantCreatedDomainEvent";
import { Log } from "../../../../Shared/Domain/Decorators/Log";

@DomainEventsHandler(TenantCreatedDomainEvent)
export class TenantCreatedDomainEventHandler implements IDomainEventHandler {
  constructor(private readonly repository: IAppConfigRepository) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(event: TenantCreatedDomainEvent): Promise<void> {
    const appConfig = AppConfig.build(event.aggregateId);

    await this.repository.save(appConfig);
  }

}