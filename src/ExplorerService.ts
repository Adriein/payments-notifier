export class ExplorerService {
  public static explore<T, C>(handler: T, metadataKey: string): C[] {
    const handlerMetadata = Reflect.getMetadata(metadataKey, handler);
    if (!handlerMetadata) {
      return [];
    }

    return handlerMetadata;
  }
}
