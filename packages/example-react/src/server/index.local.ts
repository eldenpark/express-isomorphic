import chalk from 'chalk';
import ExpressIsomorphic, {
  Extend,
} from 'express-isomorphic';
import { logger } from 'jege/server';
import http from 'http';
import path from 'path';
import express, {
  NextFunction,
  Request,
} from 'express';
import {
  watch,
  withWebpackDev,
} from 'express-isomorphic-extension/webpack';

import State from './IsomorphicState';
import webpackConfig from '../webpack/webpack.config.client.local.web';
import webpackConfigServer from '../webpack/webpack.config.server.local';

const paths = {
  dist: path.resolve(__dirname, '../../dist'),
  public: path.resolve(__dirname, '../../dist/public'),
};

const log = logger('[example-react]');

const extend: Extend<State> = async (app, serverState) => {
  app.use((req: Request, res, next: NextFunction) => {
    log('extend(): requestUrl: %s', req.url);
    next();
  });

  app.use(express.static(paths.public));

  withWebpackDev({
    serverState,
    webpackConfig,
  })(app);

  serverState.update(() => ({
    state: {
      publicPath: webpackConfig.output.publicPath,
    },
  }));

  return watch(webpackConfigServer);
};

(async function local() {
  const port = process.env.PORT || 6001;
  const { app } = await ExpressIsomorphic.createDev({
    extend,
    makeHtmlPath: path.resolve(paths.dist, 'makeHtml.bundle.js'),
    watchExt: 'js,jsx,ts,tsx,html,test',
    watchPaths: [
      path.resolve(__dirname, '../universal'),
      path.resolve(__dirname, 'html'),
    ],
  });

  const server = http.createServer(app);

  server.listen(port, () => {
    log(`local(): server is listening on: ${chalk.yellow('%s')}`, port);
  });
})();
