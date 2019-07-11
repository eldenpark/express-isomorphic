import {
  NextFunction,
  Request,
} from 'express';
import ExpressIsomorphic, {
  Extend,
} from '@nodekit/express-isomorphic';
import http from 'http';
import { logger } from '@nodekit/logger';
import path from 'path';
import { withReactProd } from '@nodekit/express-isomorphic-react/server';

import State from './State';
import webpackConfig from '../webpack/webpack.config.client.prod.web';

const webpackBuild = require('../../dist/build.json');

const log = logger('[express-isomorphic-react]');

const extend: Extend<State> = (app, serverState) => {
  app.use((req: Request, res, next: NextFunction) => {
    log('extend(): requestUrl: %s', req.url);
    next();
  });

  withReactProd({
    serverState,
    webpackBuild,
    webpackConfig,
  })(app);
};

(async () => {
  const { app } = await ExpressIsomorphic.production({
    extend,
    makeHtmlPath: path.resolve(__dirname, './makeHtml.js'),
    webpackBuild,
    webpackConfig,
  });

  const port = 6001;

  const httpServer = http.createServer(app);

  httpServer.listen(port, () => {
    log('productionServer listening on: %s', port);
  });
})();
