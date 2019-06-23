import axios from 'axios';
import chalk from 'chalk';
import { logger } from '@nodekit/logger';
import nodemon from 'nodemon';
import path from 'path';
import { RequestHandler } from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import createExpress, {
  Extend,
  ServerCreation,
  WebpackStats,
} from './createExpress';
import {
  parseWebpackBuild,
} from './utils/serverUtils';
import { ServerState } from './ServerState';

const log = logger('[express-isomorphic]');

const defaultWebpackStats = {
  all: false,
  assets: true,
  builtAt: true,
  chunks: true,
  color: true,
  entrypoints: true,
  errors: true,
};

const localServer: LocalServer = function localServer({
  extend,
  makeHtmlPath,
  webpackConfig,
  webpackStats = defaultWebpackStats,
}) {
  const { devMiddleware, hotMiddleware } = createWebpackMiddlewares({
    webpackConfig,
    webpackStats,
  });

  return createExpress({
    bootstrap: (app, serverState) => {
      setupNodemon(makeHtmlPath);

      app.use([
        devMiddleware,
        hotMiddleware,
        setLaunchStatus(serverState, webpackStats),
      ]);
    },
    extend,
    htmlGenerator: async ({
      requestUrl,
      serverState,
    }) => {
      const { data } = await axios.post('http://localhost:10021/makeHtml', {
        assets: serverState.assets,
        requestUrl,
      });
      return data;
    },
  });
};

export default localServer;

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

function setLaunchStatus(serverState: ServerState, webpackStats: WebpackStats): RequestHandler {
  return (req, res, next) => {
    if (serverState.buildHash !== res.locals.webpackStats.hash) {
      const webpackBuild = res.locals.webpackStats.toJson(webpackStats);
      const { error, assets } = parseWebpackBuild(webpackBuild);

      serverState.update({
        assets,
        buildHash: res.locals.webpackStats.hash,
        ...error && {
          error: {
            errorObj: error,
            type: 'LOCAL_WEBPACK_BUILD_ERROR',
          },
        },
        isLaunched: true,
      });
    }
    next();
  };
}

function setupNodemon(makeHtmlPath) {
  log('setupNodemon(): parent pid: %s, makeHtmlPath: %s', process.pid, makeHtmlPath);
  const script = path.resolve(__dirname, 'htmlGeneratingServer.js');

  nodemon({
    args: [
      '--port',
      10021,
      '--makeHtmlPath',
      makeHtmlPath,
    ],
    ext: 'js json jsx ts tsx',
    script,
  })
    .on('quit', () => {
      log('setupNodemon(): quit');
      process.exit();
    })
    .on('restart', (files: string[]) => {
      log(`setupNodemon(): ${chalk.green('restarted')} by: %s`, files);
    });
}

interface LocalServer {
  (arg: {
    extend?: Extend;
    makeHtmlPath: any;
    webpackConfig: any;
    webpackStats?: any;
  }): ServerCreation;
}
