import chalk from 'chalk';

const tag = chalk.cyan('[express-isomorphic]');

export const log = function (msg: string, ...args: any[]) {
  console.log(`${tag} ${msg}`, ...args);
};
