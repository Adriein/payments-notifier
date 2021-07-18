import { ICommand, IHandler } from '../../../Domain/Interfaces';
import { IQueryBus } from '../../Domain/Bus/IQueryBus';
import { BindCommandHandler } from '../../Domain/types';

export class QueryBus<T, C extends IHandler<T> = IHandler<T>> implements IQueryBus<T>
{
  private handlers: BindCommandHandler<C> = {};

  public bind = (commandName: string, handler: C): void => {
    this.handlers = { ...this.handlers, [commandName]: handler };
  };

  public async dispatch(command: ICommand): Promise<T> {
    return await this.resolveHandler(command).handle(command);
  }

  private resolveHandler(command: ICommand): C {
    return this.handlers[command.constructor.name];
  }
}
