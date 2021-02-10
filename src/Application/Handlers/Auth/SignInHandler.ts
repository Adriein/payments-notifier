import { SignInCommand } from '../../../Domain/Commands/Auth/SignInCommand';
import { Log } from '../../../Domain/Decorators/Log';
import { User } from '../../../Domain/Entities/User.entity';
import { NotAuthorizedError } from '../../../Domain/Errors/NotAuthorizedError';
import { UserNotExistError } from '../../../Domain/Errors/UserNotExistError';
import { ICommand, IHandler } from '../../../Domain/Interfaces';
import { CryptoService } from '../../../Domain/Services/CryptoService';
import { UserFinder } from '../../../Domain/Services/UserFinder';


export class SignInHandler implements IHandler<void> {
  private cryptoService = new CryptoService();
  constructor(private finder: UserFinder) {}

  @Log(process.env.LOG_LEVEL)
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
