import express, {
  NextFunction,
  Request,
} from 'express';
import ExpressIsomorphic, {
  Extend,
} from '@nodekit/express-isomorphic';
import http from 'http';
import { logger } from '@nodekit/logger';
import path from 'path';

import { parseWebpackBuild } from './serverUtils';
import State from './State';
import webpackConfig from '../webpack/webpack.config.client.prod.web';

const webpackBuild = require('../../dist/build.json');

const log = logger('[express-isomorphic-react]');

const extend: Extend<State> = (app, serverState) => {
  const { path: outputPath, publicPath } = webpackConfig.output;
  const { error, assets } = parseWebpackBuild(webpackBuild);

  log(`bootstrap(): webpackBuild:\n%j`, webpackBuild);

  serverState.update({
    isLaunched: true,
    ...error && {
      error: {
        errorObj: error,
        type: 'WEBPACK_BUILD_ERROR',
      },
    },
    state: {
      assets,
    },
  });

  app.use((req: Request, res, next: NextFunction) => {
    log('extend(): requestUrl: %s', req.url);
    next();
  });

  app.use(publicPath, express.static(outputPath));
};

const { app } = ExpressIsomorphic.production({
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
