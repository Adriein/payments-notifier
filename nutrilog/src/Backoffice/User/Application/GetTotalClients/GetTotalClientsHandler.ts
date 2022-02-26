import { QueryHandler } from "../../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { IUserRepository } from "../../Domain/IUserRepository";
import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { GetTotalClientsQuery } from "./GetTotalClientsQuery";
import { NutrilogResponse } from "../../../../Shared/Application/NutrilogResponse";

@QueryHandler(GetTotalClientsQuery)
export class GetTotalClientsHandler implements IHandler<NutrilogResponse<number>> {
  constructor(private repository: IUserRepository) {}

  public async handle({ tenantId }: GetTotalClientsQuery): Promise<NutrilogResponse<number>> {
    const result = await this.repository.countTotalUsers(tenantId);

    if (result.isLeft()) {
      throw result.value;
    }

    return new NutrilogResponse(result.value)
  }
}