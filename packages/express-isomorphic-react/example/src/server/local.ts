import ExpressIsomorphic, {
  Extend,
  ServerState,
} from '@nodekit/express-isomorphic';
import http from 'http';
import { logger } from '@nodekit/logger';
import path from 'path';
import {
  Request,
  RequestHandler,
  NextFunction,
} from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import localWebpackConfig from '../webpack/webpack.config.client.local.web';
import { parseWebpackBuild } from './serverUtils';
import State from './State';

const log = logger('[express-isomorphic-react]');

const extend: Extend<State> = (app, serverState) => {
  const webpackStats = {
    all: false,
    assets: true,
    builtAt: true,
    chunks: true,
    color: true,
    entrypoints: true,
    errors: true,
  };

  const { devMiddleware, hotMiddleware } = createWebpackMiddlewares({
    webpackConfig: localWebpackConfig,
    webpackStats,
  });

  app.use((req: Request, res, next: NextFunction) => {
    log('extend(): requestUrl: %s', req.url);
    next();
  });

  app.use([
    devMiddleware,
    hotMiddleware,
    setLaunchStatus(serverState, webpackStats),
  ]);
};

function createWebpackMiddlewares({
  webpackConfig,
  webpackStats,
}) {
  log(
    'createWebpackMiddlewares(): webpack-client-local will be compiled with config:\n%j',
    webpackConfig,
  );
  const clientWebpackCompiler = webpack(webpackConfig);

  const devMiddleware = webpackDevMiddleware(clientWebpackCompiler, {
    publicPath: webpackConfig.output.publicPath,
    serverSideRender: true,
    stats: webpackStats,
  });

  const hotMiddleware = webpackHotMiddleware(clientWebpackCompiler, {
    heartbeat: 2000,
    reload: true,
  });

  return { devMiddleware, hotMiddleware };
}

function setLaunchStatus(
  serverState: ServerState<State>,
  webpackStats: WebpackStats,
): RequestHandler {
  return (req, res, next) => {
    if (serverState.state.buildHash !== res.locals.webpackStats.hash) {
      const webpackBuild = res.locals.webpackStats.toJson(webpackStats);
      const { error, assets } = parseWebpackBuild(webpackBuild);

      serverState.update({
        ...error && {
          error: {
            errorObj: error,
            type: 'LOCAL_WEBPACK_BUILD_ERROR',
          },
        },
        state: {
          assets,
          buildHash: res.locals.webpackStats.hash,
        },
      });
    }
    next();
  };
}

const { app } = ExpressIsomorphic.local({
  extend,
  makeHtmlPath: path.resolve(__dirname, './makeHtmlLaunch.js'),
});

const port = 6001;

const httpServer = http.createServer(app);
httpServer.listen(port, () => {
  log('LocalServer listening on: %s', port);
});

interface WebpackStats {
  chunks: boolean;
  entrypoints: boolean;
  [key: string]: boolean;
}
