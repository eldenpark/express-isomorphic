import chalk from 'chalk';
import { logger } from 'jege/server';
import webpack from 'webpack';

import { defaultWebpackStats } from './internals';

const log = logger('[express-isomorphic-extension]');

export default async function watch(webpackConfig) {
  return new Promise((resolve, reject) => {
    const serverWebpackCompiler = webpack(webpackConfig);
    serverWebpackCompiler.watch({
      aggregateTimeout: 600,
    }, (err, stats) => {
      if (err || stats.hasErrors()) {
        log(`watch(): ${chalk.red('error')} bundling server: %o`, err);
        reject();
      }
      log(
        `watch(): ${chalk.green('success')} bundling server: %j`,
        stats.toJson(defaultWebpackStats),
      );
      resolve(stats.toJson(defaultWebpackStats));
    });
  });
}
