import { UpdateUserNutritionCommand } from '../../../Domain/Commands/Nutrition/UpdateUserNutritionCommand';
import { Log } from '../../../Domain/Decorators/Log';
import { ICommand } from '../../../Domain/Interfaces';
import { INutritionRepository } from '../../../Domain/Interfaces/INutritionRepository';

export class UpdateDietHandler {
  constructor(private nutritionRepository: INutritionRepository) {}

  @Log(process.env.LOG_LEVEL)
  async handle(comm: ICommand): Promise<void> {
    const command = comm as UpdateUserNutritionCommand;

    
  }
}
