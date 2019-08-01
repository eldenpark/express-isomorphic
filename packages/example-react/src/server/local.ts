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

import State from './State';
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

  return watch(webpackConfigServer);
};

(async function local() {
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

  server.listen(6001, () => {
    log('local(): server is listening on: %s', 6001);
  });
})();
