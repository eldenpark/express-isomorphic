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
import { withWebpackDev } from 'express-isomorphic-extension/webpack';

import State from './State';
import webpackConfig from '../webpack/webpack.config.client.local.web';

const paths = {
  public: path.resolve(__dirname, '../../dist/public'),
};

const log = logger('[example-react]');

const extend: Extend<State> = (app, serverState) => {
  app.use((req: Request, res, next: NextFunction) => {
    log('extend(): requestUrl: %s', req.url);
    next();
  });

  app.use(express.static(paths.public));

  withWebpackDev({
    serverState,
    webpackConfig,
  })(app);

  serverState.update({
    state: {
      testProp2: 1,
    },
  });
};

(async function local() {
  const { app } = await ExpressIsomorphic.createDev({
    extend,
    makeHtmlPath: path.resolve(__dirname, './makeHtmlLaunch.js'),
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
