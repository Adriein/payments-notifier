import { SignInCommand } from '../../../domain/commands/Auth/SignInCommand';
import { User } from '../../../domain/entities/User.entity';
import { NotAuthorizedError } from '../../../domain/errors/NotAuthorizedError';
import { UserNotExistError } from '../../../domain/errors/UserNotExistError';
import { ICommand, IHandler } from '../../../domain/interfaces';
import { CryptoService } from '../../../domain/services/CryptoService';
import { UserFinder } from '../../../domain/services/UserFinder';

export class SignInHandler implements IHandler<void> {
  private cryptoService = new CryptoService();
  constructor(private finder: UserFinder) {}

  public async handle(comm: ICommand): Promise<void> {
    const command = comm as SignInCommand;

    const userOnDb = await this.finder.find(command.email) as User;

    if (!userOnDb) {
      throw new UserNotExistError(command.email);
    }

    const allowed = await this.cryptoService.compare(
      userOnDb.getPassword()!,
      command.password
    );

    if (!allowed) {
      throw new NotAuthorizedError();
    }
  }
}
