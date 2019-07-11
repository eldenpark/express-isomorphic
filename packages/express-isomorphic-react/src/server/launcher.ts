import express, {
  Application,
  RequestHandler,
} from 'express';
import { logger } from '@nodekit/logger';
import { ServerState } from '@nodekit/express-isomorphic';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

const log = logger('[express-isomorphic-react]');

const defaultWebpackStats = {
  all: false,
  assets: true,
  builtAt: true,
  chunks: true,
  color: true,
  entrypoints: true,
  errors: true,
};

export function withReactLocal<State extends ReactServerState>({
  serverState,
  webpackConfig,
  webpackStats = defaultWebpackStats,
}: WithReactLocalArgs<State>): (app: Application) => Application {
  const { devMiddleware, hotMiddleware } = createWebpackMiddlewares({
    webpackConfig,
  });

  const webpackBuildParserLocal = createWebpackBuildParserLocal<State>(serverState, webpackStats);

  return (app) => {
    return app.use([
      devMiddleware,
      hotMiddleware,
      webpackBuildParserLocal,
    ]);
  };
}

export function withReactProd<State extends ReactServerState>({
  serverState,
  webpackBuild,
  webpackConfig,
}: WithReactProdArgs<State>): (app: Application) => Application {
  const { path: outputPath, publicPath } = webpackConfig.output;
  const { assets, error } = parseWebpackBuild(webpackBuild);

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

  return (app) => {
    return app.use(publicPath, express.static(outputPath));
  };
}

function createWebpackMiddlewares({
  webpackConfig,
  webpackStats,
}: {
  webpackConfig: WebpackConfig;
  webpackStats?: WebpackStats;
}) {
  log(
    'createWebpackMiddlewares(): webpack-client-local will be compiled with config:\n%j',
    webpackConfig,
  );
  const clientWebpackCompiler = webpack(webpackConfig);

  const devMiddleware = webpackDevMiddleware(clientWebpackCompiler, {
    publicPath: webpackConfig.output.publicPath,
    serverSideRender: true,
    stats: webpackStats || defaultWebpackStats,
  });

  const hotMiddleware = webpackHotMiddleware(clientWebpackCompiler, {
    heartbeat: 2000,
    reload: true,
  });

  return { devMiddleware, hotMiddleware };
}

function createWebpackBuildParserLocal<State extends ReactServerState>(
  serverState: ServerState<State>,
  webpackStats: WebpackStats,
): RequestHandler {
  return (req, res, next) => {
    if (serverState.state.buildHash !== res.locals.webpackStats.hash) {
      const webpackBuild = res.locals.webpackStats.toJson(webpackStats);
      const { assets, error } = parseWebpackBuild(webpackBuild);

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

function parseWebpackBuild({
  entrypoints,
}: WebpackBuild): ParsedWebpackBuild {
  log('parseWebpackBuildInfo(): entrypoints:\n%j', entrypoints);

  const assets: string[] = [];
  try {
    if (!entrypoints) {
      return {
        assets,
        error: 'entrypoints undefined',
      };
    }

    Object.values(entrypoints)
      .forEach((entrypoint: any) => {
        entrypoint.assets.forEach((asset) => {
          if (asset.match(/^.*\.(js|css)$/)) {
            assets.push(asset);
          }
        });
      });

    return {
      assets,
    };
  } catch (err) {
    return {
      assets,
      error: 'error parsing webpack build info',
    };
  }
}

export interface WebpackStats {
  chunks: boolean;
  entrypoints: boolean;
  [key: string]: boolean;
}

export interface WebpackConfig {
  output: {
    [key: string]: any;
  };
  [key: string]: any;
}

export interface ReactServerState {
  assets: string[];
  buildHash: string;
}

interface ParsedWebpackBuild {
  assets: string[];
  error?: string;
}

interface WebpackBuild {
  assets: any[];
  builtAt: number;
  entrypoints: {
    [key: string]: {
      assets: string[];
    };
  };
  errors: any[];
}

interface WithReactLocalArgs<State extends ReactServerState> {
  serverState: ServerState<State>;
  webpackConfig: WebpackConfig;
  webpackStats?: WebpackStats;
}

interface WithReactProdArgs<State extends ReactServerState> {
  serverState: ServerState<State>;
  webpackBuild: WebpackBuild;
  webpackConfig: WebpackConfig;
}
