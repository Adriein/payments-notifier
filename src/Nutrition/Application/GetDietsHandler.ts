import { Log } from '../../Domain/Decorators/Log';
import { Diet } from '../Domain/Diet.entity';
import { IHandler } from '../../Domain/Interfaces';
import { INutritionRepository } from '../Domain/INutritionRepository';
import { Nutrition } from '../Domain/Nutrition.entity';
import { ID } from '../../Domain/VO/Id.vo';

export class GetDietsHandler implements IHandler<Diet[]> {
  constructor(private repository: INutritionRepository) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(): Promise<Diet[]> {
    await this.repository.save(
      Nutrition.build(ID.generate(), 4, 5, 10, 'female')
    );
    return [] as Diet[];
  }
}
