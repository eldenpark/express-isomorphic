import chalk from 'chalk';

const tag = chalk.cyan('[isomorphic-react-server]');

export const log = function (msg: string, ...args: any[]) {
  console.log(`${tag} ${msg}`, ...args);
};
