import { Log } from '../../Domain/Decorators/Log';
import { Diet } from '../Domain/Diet.entity';
import { IHandler } from '../../Domain/Interfaces';
import { INutritionRepository } from '../Domain/INutritionRepository';
import { Nutrition } from '../Domain/Nutrition.entity';
import { ID } from '../../Domain/VO/Id.vo';
import { GetDietsQuery } from '../Domain/Commands/GetDietsQuery';

export class GetDietsHandler implements IHandler<Diet[]> {
  constructor(private repository: INutritionRepository) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(query: GetDietsQuery): Promise<Diet[]> {
    const nutrition = await this.repository.findByUserId(query.userId);
    return nutrition!.diets();
  }
}
