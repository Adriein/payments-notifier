import { User } from '../../../domain/entities/User.entity';
import { ICommand, IHandler } from '../../../domain/interfaces';
import { IRepository } from '../../../domain/interfaces/IRepository';

export class RegisterHandler implements IHandler<void> {
  constructor(
    private repository: IRepository<User>
  ) {}

  public async handle(command: ICommand): Promise<void> {
    throw new Error();
  }
}
