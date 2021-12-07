import { CommandBus } from './Bus/CommandBus';
import { QueryBus } from './Bus/QueryBus';
import QueryHandlerFactory from './Factories/QueryHandler.factory';

export abstract class BaseController<T> {
  protected get commandBus() {
    return CommandBus.instance();
  }

  protected get queryBus() {
    return QueryBus.instance<T>();
  }
}
