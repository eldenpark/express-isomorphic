import ExpressIsomorphic, {
  Extend,
} from '@nodekit/express-isomorphic';
import http from 'http';
import { logger } from '@nodekit/logger';
import path from 'path';
import { Request, NextFunction } from 'express';

import webpackConfig from '../webpack/webpack.config.client.local.web';

const log = logger('[express-isomorphic-react]');

const extend: Extend = (app) => {
  app.use((req: Request, res, next: NextFunction) => {
    const time = new Date().toISOString();
    log(`${time} [express-isomorphic-react] extend(): requestUrl: ${req.url}`);

    next();
  });
};

const { app } = ExpressIsomorphic.local({
  extend,
  makeHtmlPath: path.resolve(__dirname, './makeHtmlLaunch.js'),
  webpackConfig,
});

const port = 6001;

const httpServer = http.createServer(app);
httpServer.listen(port, () => {
  log('LocalServer listening on: %s', port);
});
