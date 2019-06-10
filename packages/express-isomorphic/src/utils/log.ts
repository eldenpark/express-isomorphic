import chalk from 'chalk';

const tag = chalk.cyan('[express-isomorphic]');

export const log = function (msg: string, ...args: any[]) {
  const time = new Date().toISOString();
  console.log(`${time} ${tag} ${msg}`, ...args);
};

