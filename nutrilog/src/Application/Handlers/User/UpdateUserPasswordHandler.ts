import { UpdateUserPasswordCommand } from '../../../Domain/Commands/User/UpdateUserPasswordCommand';
import { Log } from '../../../Shared/Domain/Decorators/Log';
import { IUserRepository } from '../../../Domain/Interfaces/IUserRepository';
import { CryptoService } from '../../../Shared/Domain/Services/CryptoService';
import { UserFinder } from '../../../Domain/Services/UserFinder';
import { ICommand } from "../../../Shared/Domain/Interfaces/ICommand";

export class UpdateUserPasswordHandler {
  constructor(
    private finder: UserFinder,
    private userRepository: IUserRepository,
    private cryptoService: CryptoService
  ) {
  }

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
