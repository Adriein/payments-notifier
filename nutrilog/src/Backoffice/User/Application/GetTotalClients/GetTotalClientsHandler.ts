import { QueryHandler } from "../../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { IUserRepository } from "../../Domain/IUserRepository";
import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { GetTotalClientsQuery } from "./GetTotalClientsQuery";

@QueryHandler(GetTotalClientsQuery)
export class GetTotalClientsHandler implements IHandler<number> {
  constructor(private repository: IUserRepository) {}

  public async handle({ tenantId }: GetTotalClientsQuery): Promise<number> {
    const result = await this.repository.countTotalUsers(tenantId);

    if (result.isLeft()) {
      throw result.value;
    }

    return result.value;
  }
}