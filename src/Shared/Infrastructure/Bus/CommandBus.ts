import { ICommand, IHandler } from '../../../Domain/Interfaces';
import { ICommandBus } from '../../Domain/Bus/ICommandBus';
import { BindCommandHandler } from '../../Domain/types';

export class CommandBus<C extends IHandler<void>> implements ICommandBus {
  private handlers: BindCommandHandler<C> = {};

  public bindHandler = (commandName: string, handler: C) => {
    this.handlers = { ...this.handlers, [commandName]: handler };
  };

  public async execute(command: ICommand): Promise<void> {
    return await this.resolveHandler(command).handle(command);
  }

  private resolveHandler(command: ICommand): C {
    return this.handlers[command.constructor.name];
  }
}
