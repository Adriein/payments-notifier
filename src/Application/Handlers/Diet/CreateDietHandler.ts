import { ICommand, IHandler } from '../../../Domain/Interfaces';
import { Log } from '../../../Domain/Decorators/Log';
import { CreateDietCommand } from '../../../Domain/Commands/Diet/CreateDietCommand';
import { IDietRepository } from '../../../Domain/Interfaces/IDietRepository';
import { Diet } from '../../../Domain/Entities/Diet.entity';

export class CreateDietHandler implements IHandler<void> {
  constructor(private dietRepository: IDietRepository) {}

  @Log(process.env.LOG_LEVEL)
  async handle(command: ICommand): Promise<void> {
    const comm = command as CreateDietCommand;

    const diet = Diet.build(Number(comm.kcal), comm.userId);

    await this.dietRepository.save(diet);
  }
}
