import { ICommand, IHandler } from '../../../Domain/Interfaces';
import { ICommandBus } from '../../Domain/Bus/ICommandBus';

export class CommandBus<C extends IHandler<void>> implements ICommandBus {
  private handlers: Map<string, C> = new Map();

  public bind = (commandName: string, handler: C) => {
    this.handlers.set(commandName, handler);
  };

  public async dispatch(command: ICommand): Promise<void> {
    return await this.resolve(command).handle(command);
  }

  private resolve(command: ICommand): C {
    const handler = this.handlers.get(command.constructor.name);

    if (!handler) {
      throw new Error();
    }

    return handler;
  }
}
