import { Log } from '../../../../Shared/Domain/Decorators/Log';
import { Diet } from '../../Domain/Diet.entity';
import { ID } from '../../../../Shared/Domain/VO/Id.vo';
import { IDietRepository } from '../../Domain/IDietRepository';
import { GetDietsQuery } from '../../Domain/Query/GetDietsQuery';
import { QueryHandler } from "../../../../Shared/Domain/Decorators/QueryHandler.decorator";
import { IHandler } from "../../../../Shared/Domain/Interfaces/IHandler";
import { GetDietResponseBuilder } from "../Services/GetDietResponseBuilder";
import { DietResponse } from "./DietResponse";
import { Criteria } from "../../../../Shared/Domain/Entities/Criteria";
import { DietFilter } from "../../Domain/DietFilter";

@QueryHandler(GetDietsQuery)
export class GetDietsHandler implements IHandler<DietResponse[]> {
  constructor(private readonly repository: IDietRepository, private readonly builder: GetDietResponseBuilder) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(query: GetDietsQuery): Promise<DietResponse[]> {
    const nutritionId = new ID(query.nutritionId);

    const criteria = new Criteria<DietFilter>();
    criteria.equals('nutritionId', nutritionId.value)

    const result = await this.repository.find(criteria);

    if (result.isLeft()) {
      throw result.value;
    }

    const diets = result.value;

    return diets.map((diet: Diet) => this.builder.run(diet));
  }
}
