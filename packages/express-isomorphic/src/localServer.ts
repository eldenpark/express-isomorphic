import chalk from 'chalk';
import del from 'del';
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
  getProperRequireCache,
  parseWebpackBuildInfo,
} from './utils/serverUtils';
import { log } from './utils/log';
import { State } from './state';

const tag = '[localServer]';

const localServer: LocalServer = function ({
  ejectPath,
  extend,
  makeHtml,
  publicPath,
  serverDistPath,
  universalAppPath,
  webpackConfig,
  webpackConfigClientLocalPath,
  webpackConfigUniversalLocalPath,
  webpackStats,
}) {
  const { devMiddleware, hotMiddleware } = createWebpackMiddlewares({
    webpackConfig,
    webpackStats,
  });

  return createExpress({
    bootstrap: (state) => {
      setupWatchingWebpackUniversalCompiler({
        serverDistPath,
        state,
        universalAppPath,
        webpackConfigUniversalLocalPath,
        webpackStats,
      }).then(() => {
        ejectPath && eject({
          assets: state.assets,
          ejectPath,
          makeHtml,
          state,
        });
      });

      return [
        devMiddleware,
        hotMiddleware,
        setLaunchStatus(state, webpackStats),
      ];
    },
    extend,
    makeHtml,
    publicPath,
    webpackConfig,
  });
};

export default localServer;

function createWebpackMiddlewares({
  webpackConfig,
  webpackStats,
}) {
  // const webpackConfigClientLocalWeb = require(webpackConfigClientLocalPath);
  const webpackConfigClientLocalWeb = webpackConfig;
  log(
    '%s webpack-client-local will be compiled with config:\n%o',
    tag,
    webpackConfigClientLocalWeb,
  );
  const clientWebpackCompiler = webpack(webpackConfigClientLocalWeb);

  const devMiddleware = webpackDevMiddleware(clientWebpackCompiler, {
    publicPath: webpackConfigClientLocalWeb.output.publicPath,
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

function setupWatchingWebpackUniversalCompiler({
  serverDistPath,
  state,
  universalAppPath,
  webpackConfigUniversalLocalPath,
  webpackStats,
}) {
  state.update({
    universalAppPath,
  });

  const webpackConfig = require(webpackConfigUniversalLocalPath);

  log(
    '%s [watch] webpack-universal-local will be compiled with webpack-universal-config:\n deleting serverDistPath: %s\n%o',
    tag,
    webpackConfig,
    serverDistPath,
  );

  del.sync([
    serverDistPath,
  ]);

  const serverWebpackCompiler = webpack(webpackConfig);
  const watchOptions = {
    aggregateTimeout: 2000,
    poll: undefined,
  };

  return new Promise((resolve, reject) => {
    serverWebpackCompiler.watch(watchOptions, (err, stats) => {
      if (err || stats.hasErrors()) {
        const error = stats.toString('errors-only');
        log(
          `%s [watch] [error] webpack-universal-local watch() ${chalk.red('fails')}:\n%s`,
          tag,
          error
        );

        state.update({
          error: {
            type: ErrorType.WATCH_UNIVERSAL_ERROR,
            errorObj: error,
          },
        });
        reject(error);
      } else {
        const info = stats.toJson(webpackStats);
        log(
          `%s [watch] webpack-universal-local watch() ${chalk.green('success')}: at: %s,\n%o`,
          tag,
          new Date(),
          info
        );

        const cacheInMemory = getProperRequireCache();
        if (cacheInMemory.indexOf(state.universalAppPath) === -1) {
          log(`[warn] Cache not found: %s`, state.universalAppPath);
        }

        delete require.cache[state.universalAppPath];
        const remainingModulesInCache = getProperRequireCache();

        log(
          '%s [watch] require cache after deleting universalAppPath (at %s):\n%o',
          tag,
          state.universalAppPath,
          remainingModulesInCache,
        );

        state.update({
          error: undefined,
        });
        resolve();
      }
    });
  });
}

interface LocalServer {
  (arg: {
    ejectPath?: string;
    extend?: Extend;
    makeHtml: MakeHtml;
    publicPath: string;
    serverDistPath: string;
    universalAppPath: string;
    webpackConfig: any;
    webpackConfigClientLocalPath: string;
    webpackConfigUniversalLocalPath: string;
    webpackStats: any;
  }): ServerCreation;
}

interface SetLaunchStatus {
  (state: State, webpackStats: WebpackStats): RequestHandler;
}
