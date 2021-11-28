import { Log } from '../../../Shared/Domain/Decorators/Log';
import { Diet } from '../Domain/Diet.entity';
import { IHandler } from '../../../Domain/Interfaces';
import { ID } from '../../../Shared/Domain/VO/Id.vo';
import { IDietRepository } from '../Domain/IDietRepository';
import { GetDietsQuery } from '../Domain/Query/GetDietsQuery';
import { QueryHandler } from "../../../Shared/Domain/Decorators/QueryHandler.decorator";

@QueryHandler(GetDietsQuery)
export class GetDietsHandler implements IHandler<Diet[]> {
  constructor(private repository: IDietRepository) {
  }

  @Log(process.env.LOG_LEVEL)
  public async handle(query: GetDietsQuery): Promise<Diet[]> {
    const nutritionId = new ID(query.nutritionId);

    const diets = await this.repository.findAll(nutritionId.value);

    return diets;
  }
}
