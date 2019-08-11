import {
  Application,
  RequestHandler,
} from 'express';
import { logger } from 'jege/server';
import { ServerState } from 'express-isomorphic';
import webpack, {
  Configuration,
  Stats,
} from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import {
  defaultWebpackStats,
  parseWebpackBuild,
} from './internals';
import {
  WebpackServerState,
} from './types';

const log = logger('[express-isomorphic-extension]');

export default function withWebpackDev<State extends WebpackServerState>({
  serverState,
  webpackConfig,
  webpackStats = defaultWebpackStats,
}: WithWebpackDevArgs<State>): (app: Application) => Application {
  const { devMiddleware, hotMiddleware } = createWebpackMiddlewares({
    webpackConfig,
  });

  const webpackBuildParserLocal = createWebpackBuildParserDev<State>(serverState, webpackStats);

  return (app) => {
    return app.use([
      devMiddleware,
      hotMiddleware,
      webpackBuildParserLocal,
    ]);
  };
}

function createWebpackMiddlewares({
  webpackConfig,
  webpackStats,
}: {
  webpackConfig: Configuration;
  webpackStats?: Stats.ToJsonOptions;
}) {
  log(
    'createWebpackMiddlewares(): webpack-client-local will be compiled with config: %j',
    webpackConfig,
  );
  const clientWebpackCompiler = webpack(webpackConfig);

  const devMiddleware = webpackDevMiddleware(clientWebpackCompiler, {
    publicPath: webpackConfig.output!.publicPath,
    serverSideRender: true,
    stats: webpackStats || defaultWebpackStats,
  });

  const hotMiddleware = webpackHotMiddleware(clientWebpackCompiler, {
    heartbeat: 2000,
    reload: true,
  });

  return { devMiddleware, hotMiddleware };
}

function createWebpackBuildParserDev<State extends WebpackServerState>(
  serverState: ServerState<State>,
  webpackStats: Stats.ToJsonOptions,
): RequestHandler {
  return (req, res, next) => {
    if (serverState.getState().state.buildHash !== res.locals.webpackStats.hash) {
      const webpackBuild = res.locals.webpackStats.toJson(webpackStats);
      const { assets, error } = parseWebpackBuild(webpackBuild);

      serverState.update((object) => ({
        ...object,
        ...error && {
          error: {
            errorObj: error,
            type: 'LOCAL_WEBPACK_BUILD_ERROR',
          },
        },
        state: {
          ...object.state,
          assets,
          buildHash: res.locals.webpackStats.hash,
        },
      }));
    }
    next();
  };
}

interface WithWebpackDevArgs<State extends WebpackServerState> {
  serverState: ServerState<State>;
  webpackConfig: Configuration;
  webpackStats?: Stats.ToJsonOptions;
}
