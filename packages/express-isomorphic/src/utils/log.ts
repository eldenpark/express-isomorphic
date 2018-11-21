import chalk from 'chalk';

const tag = `[${chalk.yellow('isomorphic-react-server')}]`;

export const log = function (msg: string, ...args: any[]) {
  console.log(`${tag} ${msg}`, ...args);
};
