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
  MakeHtmlPayload,
  ServerCreation,
  WebpackStats,
} from './createExpress';
import {
  parseWebpackBuild,
} from './utils/serverUtils';
import ServerState from './ServerState';

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

const localServer: LocalServer = <State extends {}> ({
  extend,
  makeHtmlPath,
  webpackConfig,
  webpackStats = defaultWebpackStats,
}) => {
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
      const makeHtmlPayload: MakeHtmlPayload<State> = {
        requestUrl,
        serverState,
      };
      const { data } = await axios.post('http://localhost:10021/makeHtml', makeHtmlPayload);
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

function setLaunchStatus<State>(
  serverState: ServerState<State>,
  webpackStats: WebpackStats,
): RequestHandler {
  return (req, res, next) => {
    if (serverState.state['buildHash'] !== res.locals.webpackStats.hash) { // eslint-disable-line
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
  <State>(arg: {
    extend?: Extend<State>;
    makeHtmlPath: any;
    webpackConfig: any;
    webpackStats?: any;
  }): ServerCreation<State>;
}
