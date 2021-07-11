export function column() {
  return function (target: Object, key: string) {
    // console.log(target);
    // console.log(key);
    Reflect.metadata('baby', key);
  };
}
