import { UpdateUserNotificationsCommand } from '../../../Domain/Commands/User/UpdateUserNotificationsCommand';
import { Log } from '../../../Domain/Decorators/Log';
import { User } from '../../../Domain/Entities/User.entity';
import { ICommand, IHandler } from '../../../Domain/Interfaces';
import { IUserRepository } from '../../../Domain/Interfaces/IUserRepository';
import { UserFinder } from '../../../Domain/Services/UserFinder';

export class UpdateUserNotificationsHandler implements IHandler<void> {
  constructor(
    private finder: UserFinder,
    private userRepository: IUserRepository
  ) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(comm: ICommand): Promise<void> {
    const command = comm as UpdateUserNotificationsCommand;

    const userOnDb = (await this.finder.find(command.email)) as User;

    const sendWarnings = command.sendWarnings === 'Si' ? true : false;

    await this.userRepository.updateUserNotifications(
      userOnDb.configId()!,
      sendWarnings
    );
  }
}
