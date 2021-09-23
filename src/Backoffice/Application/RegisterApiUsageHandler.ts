import { Log } from '../../Domain/Decorators/Log';
import { ID } from '../../Domain/VO/Id.vo';
import { ApiQueryDomainEvent } from '../../Food/Domain/ApiQueryDomainEvent';
import { DomainEventsHandler } from '../../Shared/Domain/Decorators/DomainEventsHandler.decorator';
import { IDomainEventHandler } from '../../Shared/Domain/Interfaces/IDomainEventHandler';
import { ApiUsage } from '../Domain/ApiUsage.entity';
import { IApiUsageRepository } from '../Domain/IApiUsageRepository';

@DomainEventsHandler(ApiQueryDomainEvent)
export class RegisterApiUsageHandler implements IDomainEventHandler {
  constructor(private repository: IApiUsageRepository) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(event: ApiQueryDomainEvent): Promise<void> {
    const usage = ApiUsage.build(new ID(event.userId), event.calls);
    await this.repository.save(usage);
  }
}