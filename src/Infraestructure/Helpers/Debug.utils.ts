import chalk from 'chalk';

export const debug = (...params: any[]): void => {
  const stringified = params.map((param) => JSON.stringify(param, null , 2));
  console.log(chalk.green(...stringified));
};
