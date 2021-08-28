import { Log } from '../../Domain/Decorators/Log';
import { IHandler } from '../../Domain/Interfaces';
import { ID } from '../../Domain/VO/Id.vo';
import { CreateDietCommand } from '../Domain/Command/CreateDietCommand';
import { DietType } from '../Domain/VO/DietType.vo';
import { IDietRepository } from '../Domain/IDietRepository';
import { Diet } from '../Domain/Diet.entity';

export class CreateDietHandler implements IHandler<void> {
  constructor(private repository: IDietRepository) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(command: CreateDietCommand): Promise<void> {
    const nutritionId = new ID(command.nutritionId);
    const objective = new DietType(command.objective);

    const diet = new Diet(
      ID.generate(),
      command.name,
      nutritionId,
      objective,
      command.kcalChange!
    );

    await this.repository.save(diet);
  }
}
