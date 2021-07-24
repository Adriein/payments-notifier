import { ICommand, IHandler } from '../../../Domain/Interfaces';
import { IQueryBus } from '../../Domain/Bus/IQueryBus';
import { ConstructorFunc } from '../../Domain/types';

export class QueryBus<T, H extends IHandler<T> = IHandler<T>> implements IQueryBus<T>
{
  private handlers: Map<string, H> = new Map();

  public bind = (command: ConstructorFunc, handler: H): void => {
    this.handlers.set(command.name, handler);
  };

  public async dispatch(command: ICommand): Promise<T> {
    return await this.resolve(command).handle(command);
  }

  private resolve(command: ICommand): H{
    const handler = this.handlers.get(command.constructor.name);

    if (!handler) {
      throw new Error();
    }

    return handler;
  }
}
