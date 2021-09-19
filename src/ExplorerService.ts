import { EVENTS_HANDLER_METADATA } from './Shared/Domain/constants';

export class ExplorerService {
  public static explore<T, C>(handler: T): C[] {
    const handlerMetadata = Reflect.getMetadata(EVENTS_HANDLER_METADATA, handler);
    if (!handlerMetadata) {
      return [];
    }

    return handlerMetadata;
  }
}
