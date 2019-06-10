import axios from 'axios';
import nodemon from 'nodemon';
import path from 'path';
import { RequestHandler } from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import createExpress, {
  Extend,
  MakeHtml,
  ServerCreation,
  WebpackStats,
} from './createExpress';
import eject, { Eject } from './eject';
import ErrorType from './ErrorType';
import {
  parseWebpackBuildInfo,
} from './utils/serverUtils';
import { log } from './utils/log';
import { State } from './state';

const localServer: LocalServer = function ({
  ejectPath,
  extend,
  makeHtmlPath,
  webpackConfig,
  webpackStats,
}) {
  const { devMiddleware, hotMiddleware } = createWebpackMiddlewares({
    webpackConfig,
    webpackStats,
  });

  return createExpress({
    bootstrap: (state) => {
      setupNodemon(makeHtmlPath);

      return [
        devMiddleware,
        hotMiddleware,
        setLaunchStatus(state, webpackStats),
      ];
    },
    extend,
    makeHtml: async ({
      assets,
      requestUrl,
    }) => {
      const { data } = await axios.post('http://localhost:10021/makeHtml', {
        assets,
        requestUrl,
      });
      return data;
    },
    webpackConfig,
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

const setLaunchStatus: SetLaunchStatus = (state, webpackStats) => (req, res, next) => {
  if (state.buildHash !== res.locals.webpackStats.hash) {
    const info = res.locals.webpackStats.toJson(webpackStats);
    const { error, assets } = parseWebpackBuildInfo(info);

    state.update({
      assets,
      buildHash: res.locals.webpackStats.hash,
      ...error && {
        error: {
          errorObj: error,
          type: ErrorType.WATCH_UNIVERSAL_ERROR,
        },
      },
      isLaunched: true,
    });
  }
  next();
};

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
      log('setupNodemon(): restarted by', files);
    });
}

interface LocalServer {
  (arg: {
    ejectPath?: string;
    extend?: Extend;
    makeHtmlPath: any;
    publicPath: string;
    webpackConfig: any;
    webpackStats: any;
  }): ServerCreation;
}

interface SetLaunchStatus {
  (state: State, webpackStats: WebpackStats): RequestHandler;
}
