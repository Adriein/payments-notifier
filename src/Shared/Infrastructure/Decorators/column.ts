export function column() {
  return function (target: Object, key: string, descriptor?: any) {
    Reflect.defineMetadata(key, key, target);
  };
}
