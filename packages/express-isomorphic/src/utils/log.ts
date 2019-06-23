import chalk from 'chalk';

const tag = chalk.cyan('[express-isomorphic]');

export function log(msg: string, ...args: any[]) {
  const time = new Date().toISOString();
  console.log(`${time} ${tag} ${msg}`, ...args); // eslint-disable-line
}
