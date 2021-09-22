import { SignInCommand } from '../../../Domain/Commands/Auth/SignInCommand';
import { Log } from '../../../Domain/Decorators/Log';
import { NotAuthorizedError } from '../../../Domain/Errors/NotAuthorizedError';
import { UserNotExistError } from '../../../Domain/Errors';
import { IHandler } from '../../../Domain/Interfaces';
import { CryptoService } from '../../../Domain/Services/CryptoService';
import { UserFinder } from '../../../Domain/Services/UserFinder';
import { ICommand } from "../../../Shared/Domain/Interfaces/ICommand";


export class SignInHandler implements IHandler<void> {
  constructor(private finder: UserFinder, private cryptoService: CryptoService) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(comm: ICommand): Promise<void> {
    const command = comm as SignInCommand;

    const userOnDb = await this.finder.findByEmail(command.email);

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
