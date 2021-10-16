export function Column() {
  return function (target: Object, key: string) {
    Reflect.defineMetadata(key, key, target);
  };
}
