import express, {
  NextFunction,
  Request,
} from 'express';
import ExpressIsomorphic, {
  Extend,
} from 'express-isomorphic';
import http from 'http';
import { logger } from 'jege/server';
import path from 'path';
import { withWebpack } from 'express-isomorphic-extension/webpack';

import IsomorphicState from './IsomorphicState';
import webpackConfig from '../webpack/webpack.config.client.prod.web';

const webpackBuild = require('../../dist/build.json');

const log = logger('[example-react]');

const paths = {
  dist: path.resolve(__dirname, '../../dist'),
};

const extend: Extend<IsomorphicState> = async (app, serverState) => {
  app.use((req: Request, res, next: NextFunction) => {
    log('extend(): requestUrl: %s', req.url);
    next();
  });

  withWebpack({
    serverState,
    webpackBuild,
  })(app);

  const { path: outputPath, publicPath } = webpackConfig.output;
  log('extend(): publicPath: %s, outputPath: %s', publicPath, outputPath);
  app.use(publicPath, express.static(outputPath));

  return Promise.all([])
    .then(() => {
      serverState.update((object) => ({
        ...object,
        state: {
          ...object.state,
          publicPath,
        },
      }));
    });
};

(async () => {
  const { app, eject } = await ExpressIsomorphic.create({
    ejectPath: paths.dist,
    extend,
    makeHtmlPath: path.resolve(__dirname, '../makeHtml.bundle.js'),
  });

  const port = 6001;

  const httpServer = http.createServer(app);

  httpServer.listen(port, () => {
    log('productionServer listening on: %s', port);
  });

  await eject({
    fileName: 'index.html',
    requestUrl: `http://localhost:${port}/`,
  });
})();
