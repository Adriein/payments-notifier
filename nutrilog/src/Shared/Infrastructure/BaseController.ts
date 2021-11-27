import { CommandBus } from './Bus/CommandBus';
import { QueryBus } from './Bus/QueryBus';
import HandlerFactory from './Factories/Handler.factory';

export abstract class BaseController<T> {
  protected get commandBus() {
    return CommandBus.instance();
  }

  protected get queryBus() {
    return QueryBus.instance<T>();
  }
}
