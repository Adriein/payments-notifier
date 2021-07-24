import { CommandBus } from './Bus/CommandBus';
import { QueryBus } from './Bus/QueryBus';
import HandlerFactory from './Factories/Handler.factory';

export abstract class BaseController<T> {
  protected commandBus: CommandBus = new CommandBus();
  protected queryBus: QueryBus<T> = new QueryBus();
  protected factory: HandlerFactory = new HandlerFactory();
}
