import { IHandler } from '../../../Domain/Interfaces';
import { IQueryBus } from '../../Domain/Bus/IQueryBus';
import { QueryClass } from '../../Domain/types';
import { IQuery } from "../../Domain/Interfaces/IQuery";

export class QueryBus<T> implements IQueryBus<T>
{
  private static _instance: QueryBus<any>;
  private static handlers: Map<string, IHandler<any>> = new Map();

  private constructor() {}

  public static instance<T>(): QueryBus<T> {
    if (!QueryBus._instance) {
      QueryBus._instance = new QueryBus();
    }

    return QueryBus._instance;
  }

  public static bind = (command: QueryClass, handler: IHandler<any>): void => {
    QueryBus.handlers.set(command.name, handler);
  };

  public async ask(command: IQuery): Promise<T> {
    return await this.resolve(command).handle(command);
  }

  private resolve(query: IQuery): IHandler<T> {
    const handler = QueryBus.handlers.get(query.constructor.name);

    if (!handler) {
      throw new Error();
    }

    return handler;
  }
}
