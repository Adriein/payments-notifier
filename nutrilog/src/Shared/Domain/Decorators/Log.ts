import chalk from 'chalk';

export function Log(level: string = 'info') {
  return function (target: Object, key: string, desc: PropertyDescriptor) {
    const fn = desc.value;

    if (fn.constructor.name === 'AsyncFunction') {
      desc.value = async function (...args: any[]) {
        if (level !== 'info') {
          conlog().call(this, key);
        }
        try {
          return await fn.apply(this, args);
        } catch (error) {
          conlog().call(this, key, error);
          throw error;
        }
      };
    } else {
      desc.value = function (...args: any[]) {
        if (level !== 'info') {
          conlog().call(this, key);
        }
        try {
          return fn.apply(this, args);
        } catch (error: any) {
          conlog().call(this, key, error);
          throw error;
        }
      };
    }
  };
}

const conlog = function () {
  return function (this: any, key: any, error: any = undefined) {
    if (!error) {
      console.log(
        chalk.magentaBright(
          `👻 Executing function "${key}" in class "${this.constructor.name}"`
        )
      );
    } else {
      console.log(
        chalk.redBright(
          `👻 Error in function "${key}" in class "${this.constructor.name}"💥`
        )
      );
    }
  };
};
