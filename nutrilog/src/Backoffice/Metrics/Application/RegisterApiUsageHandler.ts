import { ApiUsage } from '../Domain/ApiUsage.entity';
import { DomainEventsHandler } from "../../../Shared/Domain/Decorators/DomainEventsHandler.decorator";
import { IDomainEventHandler } from "../../../Shared/Domain/Interfaces/IDomainEventHandler";
import { ApiQueryDomainEvent } from "../../../Alimentation/Food/Domain/ApiQueryDomainEvent";
import { ID } from "../../../Shared/Domain/VO/Id.vo";
import { IApiUsageRepository } from "../Domain/IApiUsageRepository";
import { Log } from "../../../Shared/Domain/Decorators/Log";

@DomainEventsHandler(ApiQueryDomainEvent)
export class RegisterApiUsageHandler implements IDomainEventHandler {
  constructor(private repository: IApiUsageRepository) {
  }

  @Log(process.env.LOG_LEVEL)
  public async handle(event: ApiQueryDomainEvent): Promise<void> {
    const usage = ApiUsage.build(new ID(event.userId), event.calls);
    await this.repository.save(usage);
  }
}
