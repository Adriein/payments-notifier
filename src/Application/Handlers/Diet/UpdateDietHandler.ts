import { UpdateDietCommand } from '../../../Domain/Commands/Diet/UpdateDietCommand';
import { Log } from '../../../Domain/Decorators/Log';
import { Diet } from '../../../Domain/Entities/Diet.entity';
import { DietCustomitzation } from '../../../Domain/Entities/DietCustomitzation.entity';
import { ICommand, IHandler } from '../../../Domain/Interfaces';
import { IDietRepository } from '../../../Domain/Interfaces/IDietRepository';

export class UpdateDietHandler implements IHandler<void> {
  constructor(private dietRepository: IDietRepository) {}

  @Log(process.env.LOG_LEVEL)
  async handle(comm: ICommand): Promise<void> {
    const command = comm as UpdateDietCommand;

    const dietOnDb = await this.dietRepository.findOne(command.dietId);

    if (!dietOnDb) {
      throw new Error();
    }

    const diet = new Diet(
      dietOnDb.id(),
      Number(command.kcal),
      dietOnDb.userId(),
      new DietCustomitzation('', dietOnDb.id())
    );

    await this.dietRepository.update(diet);
  }
}
