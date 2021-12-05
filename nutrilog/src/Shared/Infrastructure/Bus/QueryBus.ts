import { IQueryBus } from '../../Domain/Bus/IQueryBus';
import { QueryClass } from '../../Domain/types';
import { IQuery } from "../../Domain/Interfaces/IQuery";
import { IHandler } from "../../Domain/Interfaces/IHandler";

export class QueryBus<T> implements IQueryBus<T> {
  private static _instance: QueryBus<any>;
  private static handlers: Map<string, IHandler<any>> = new Map();

  private constructor() {
  }

  public static instance<T>(): QueryBus<T> {
    if (!QueryBus._instance) {
      QueryBus._instance = new QueryBus<T>();
    }

    return QueryBus._instance as QueryBus<T>;
  }

  public static bind = (command: QueryClass, handler: IHandler<any>): void => {
    QueryBus.handlers.set(command.name, handler);
  };

  public async ask(query: IQuery): Promise<T> {
    return await this.resolve(query).handle(query);
  }

  private resolve(query: IQuery): IHandler<T> {
    const handler = QueryBus.handlers.get(query.constructor.name);

    if (!handler) {
      throw new Error(`No query handler found for ${query.constructor.name}`);
    }

    return handler;
  }
}
