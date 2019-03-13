import chalk from 'chalk';

const tag = chalk.cyan('[express-isomorphic]');

export const log = function (msg: string, ...args: any[]) {
  const time = new Date().toISOString();
  console.log(`${time} ${tag} ${msg}`, ...args);
};

export function htmlLogger(req, res, next) {
  log('[express] %s url: %s, user agent: %s', new Date(), req.url, req.get('User-Agent'));
  next();
}
