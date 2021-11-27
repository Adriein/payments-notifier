import * as ctx from 'chalk';
const chalk = new ctx.Instance({ level: 3 });

interface Colors {
  green: 'green';
  blue: 'blue';
  magenta: 'magenta';
}

export class Logger {
  public static debug(param: any, color: keyof Colors = 'green'): void {
    if (typeof param === 'object') {
      console.log(chalk[color](JSON.stringify(param, null, 2)));
      return;
    }

    console.log(chalk[color](param));
  }
}
