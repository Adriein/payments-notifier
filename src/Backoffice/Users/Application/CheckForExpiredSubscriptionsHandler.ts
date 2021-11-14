import { IHandler } from "../../../Shared/Domain/Interfaces/IHandler";
import { QueryHandler } from "../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { CheckForExpiredSubscriptionsQuery } from "../Domain/Query/CheckForExpiredSubscriptionsQuery";
import { IUserRepository } from "../Domain/IUserRepository";
import { Log } from "../../../Shared/Domain/Decorators/Log";

@QueryHandler(CheckForExpiredSubscriptionsQuery)
export class CheckForExpiredSubscriptionsHandler implements IHandler<void> {
  constructor(private readonly repository: IUserRepository) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(query: CheckForExpiredSubscriptionsQuery): Promise<void> {
    const admins = await this.repository.findAdmins();

    for (const admin of admins) {
      
    }
  }
}