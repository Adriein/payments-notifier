import { ICommand, IHandler } from '../../../Domain/Interfaces';
import { ICommandBus } from '../../Domain/Bus/ICommandBus';
import { ConstructorFunc } from '../../Domain/types';

export class CommandBus<H extends IHandler<void> = IHandler<void>> implements ICommandBus {
  private handlers: Map<string, H> = new Map();

  public bind = (command: ConstructorFunc, handler: H) => {
    this.handlers.set(command.name, handler);
  };

  public async dispatch(command: ICommand): Promise<void> {
    return await this.resolve(command).handle(command);
  }

  private resolve(command: ICommand): H {
    const handler = this.handlers.get(command.constructor.name);

    if (!handler) {
      throw new Error();
    }

    return handler;
  }
}
