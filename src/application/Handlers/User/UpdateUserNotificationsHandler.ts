import { UpdateUserNotificationsCommand } from '../../../domain/commands/User/UpdateUserNotificationsCommand';
import { Log } from '../../../domain/Decorators/Log';
import { User } from '../../../domain/entities/User.entity';
import { ICommand, IHandler } from '../../../domain/interfaces';
import { IUserRepository } from '../../../domain/interfaces/IUserRepository';
import { UserFinder } from '../../../domain/services/UserFinder';

export class UpdateUserNotificationsHandler implements IHandler<void> {
  constructor(
    private finder: UserFinder,
    private userRepository: IUserRepository
  ) {}

  @Log(process.env.LOG_LEVEL)
  public async handle(comm: ICommand): Promise<void> {
    const command = comm as UpdateUserNotificationsCommand;

    const userOnDb = (await this.finder.find(command.email)) as User;

    const sendNotifications = command.sendNotifications === 'Si' ? true : false;

    await this.userRepository.updateUserNotifications(
      userOnDb.configId()!,
      sendNotifications
    );
  }
}
