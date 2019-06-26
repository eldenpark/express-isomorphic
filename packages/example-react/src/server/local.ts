import ExpressIsomorphic, {
  Extend,
} from '@nodekit/express-isomorphic';
import http from 'http';
import { logger } from '@nodekit/logger';
import path from 'path';
import {
  NextFunction,
  Request,
} from 'express';
import { withReactLocal } from '@nodekit/express-isomorphic-react';

import webpackConfig from '../webpack/webpack.config.client.local.web';
import State from './State';

const log = logger('[example-react]');

const extend: Extend<State> = (app, serverState) => {
  app.use((req: Request, res, next: NextFunction) => {
    log('extend(): requestUrl: %s', req.url);
    next();
  });

  withReactLocal({
    serverState,
    webpackConfig,
  })(app);
};

(async () => {
  const { app } = await ExpressIsomorphic.local({
    extend,
    makeHtmlPath: path.resolve(__dirname, './makeHtmlLaunch.js'),
  });

  const port = 6001;

  const httpServer = http.createServer(app);
  httpServer.listen(port, () => {
    log('LocalServer listening on: %s', port);
  });
})();
