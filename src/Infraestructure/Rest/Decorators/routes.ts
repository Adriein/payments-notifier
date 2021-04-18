import 'reflect-metadata';
import { MetadaDataKeys, Methods } from '../enums';

function routeBinder(method: Methods.get | Methods.post | Methods.put | Methods.del) {
  return function (path: string) {
    return function (target: any, key: string, desc: PropertyDescriptor) {
      Reflect.defineMetadata(MetadaDataKeys.path, path, target, key);
      Reflect.defineMetadata(MetadaDataKeys.method, method, target, key);
    };
  };
}
export const get = routeBinder(Methods.get);
export const post = routeBinder(Methods.post);
export const put = routeBinder(Methods.put);
export const del = routeBinder(Methods.del);
