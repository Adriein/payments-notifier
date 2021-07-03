import { UpdateUserPasswordCommand } from '../../../Domain/Commands/User/UpdateUserPasswordCommand';
import { Log } from '../../../Domain/Decorators/Log';
import { ICommand } from '../../../Domain/Interfaces';
import { IUserRepository } from '../../../Domain/Interfaces/IUserRepository';
import { CryptoService } from '../../../Domain/Services/CryptoService';
import { UserFinder } from '../../../Domain/Services/UserFinder';

export class UpdateUserPasswordHandler {
  constructor(
    private finder: UserFinder,
    private userRepository: IUserRepository,
    private cryptoService: CryptoService
  ) {}

  @Log(process.env.LOG_LEVEL)
  async handle(comm: ICommand): Promise<void> {
    const command = comm as UpdateUserPasswordCommand;

    const user = await this.finder.findById(command.userId);

    const allowed = this.cryptoService.compare(
      user.getPassword()!,
      command.oldPassword
    );

    if (!allowed) {
      throw new Error();
    }

    await this.userRepository.updatePassword(user.id(), command.newPassword);
  }
}
