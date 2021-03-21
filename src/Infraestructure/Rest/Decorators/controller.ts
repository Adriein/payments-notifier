import 'reflect-metadata';
import { AppRouter } from '../AppRouter';
import { MetadaDataKeys, Methods } from '../enums';

export function Controller() {
  return function (target: Function) {
    const router = AppRouter.getInstance();

    for (const key of Object.getOwnPropertyNames(target.prototype)) {
      const routeHandler = target.prototype[key].bind(target.prototype);
      const path = Reflect.getMetadata(
        MetadaDataKeys.path,
        target.prototype,
        key
      );
      const method: Methods = Reflect.getMetadata(
        MetadaDataKeys.method,
        target.prototype,
        key
      );
      const middlewares = Reflect.getMetadata(
        MetadaDataKeys.middleware,
        target.prototype,
        key
      ) || [];

      if (path) {
        router[method](`${path}`, ...middlewares, routeHandler);
      }
    }
  };
}
