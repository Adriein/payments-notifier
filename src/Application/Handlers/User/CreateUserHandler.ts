import { ICommand, IHandler } from '../../../Domain/Interfaces';
import { IUserRepository } from '../../../Domain/Interfaces/IUserRepository';
import { UserFinder } from '../../../Domain/Services/UserFinder';

export class CreateUserHandler implements IHandler<void> {
  constructor(
    private finder: UserFinder,
    private userRepository: IUserRepository
  ) {}
  handle(command: ICommand): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
