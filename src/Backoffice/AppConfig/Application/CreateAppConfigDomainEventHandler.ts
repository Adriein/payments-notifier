import { IDomainEventHandler } from "../../../Shared/Domain/Interfaces/IDomainEventHandler";
import { DomainEventsHandler } from "../../../Shared/Domain/Decorators/DomainEventsHandler.decorator";
import { AppConfig } from "../Domain/AppConfig.entity";
import { ID } from "../../../Shared/Domain/VO/Id.vo";
import { IAppConfigRepository } from "../Domain/IAppConfigRepository";
import { AdminCreatedDomainEvent } from "../../Users/Domain/DomainEvents/AdminCreatedDomainEvent";
import { Log } from "../../../Shared/Domain/Decorators/Log";

@DomainEventsHandler(AdminCreatedDomainEvent)
export class CreateAppConfigDomainEventHandler implements IDomainEventHandler {
  constructor(private readonly repository: IAppConfigRepository) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(event: AdminCreatedDomainEvent): Promise<void> {
    const appConfig = AppConfig.build(new ID(event.aggregateId));

    await this.repository.save(appConfig);
  }

}