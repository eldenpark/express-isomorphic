import del from 'del';
import * as express from "express";
import * as fs from 'fs';
import * as path from "path";
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import createExpress, { 
  MakeHtml,
  Server,
} from './createExpress';
import { 
  getProperRequireCache,
  parseWebpackBuildInfo,
} from './utils/serverUtils';
import { log } from './utils/log';

const localServer: LocalServer = function ({
  makeHtml,
  publicPath,
  serverDistPath,
  webpackConfigClientLocalPath,
  webpackConfigUniversalLocalPath,
  webpackStats,
}) {
  return createExpress({
    enhance: (app, state) => {
      log(
`localServer()
serverDistPath: %s
webpackConfigClientLocalPath: %s
webpackConfigUniversalLocal: %s
webpackStats: %o`,
        serverDistPath,
        webpackConfigClientLocalPath,
        webpackConfigUniversalLocalPath,
        webpackStats,
      );

      setupWatchingWebpackUniversalCompiler({
        serverDistPath,
        state,
        webpackConfigUniversalLocalPath,
        webpackStats,
      });

      const webpackConfigClientLocalWeb = require(webpackConfigClientLocalPath);
      log(
        '[server-local] webpack-client-local will be compiled with config:\n%o',
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

      app.use(devMiddleware);

      app.use(hotMiddleware);

      app.use((req, res, next) => {
        if (!state.assets) {
          const info = res.locals.webpackStats.toJson(webpackStats);
          const { error, assets } = parseWebpackBuildInfo(info);
          
          state.update({
            ...error && { error },
            assets,
          });
        }
        next();
      });
    },
    makeHtml,
    publicPath,
  });
};

export default localServer;

function setupWatchingWebpackUniversalCompiler({
  serverDistPath,
  state,
  webpackConfigUniversalLocalPath,
  webpackStats,
}) {
  const webpackConfig = require(webpackConfigUniversalLocalPath);

  del.sync([
    serverDistPath,
  ]);

  log(
    '[server-local] webpack-universal-local will be compiled with config:\n%o',
    webpackConfig,
  );
  const serverWebpackCompiler = webpack(webpackConfig);
  const watchOptions = {
    aggregateTimeout: 2000,
    poll: undefined,
  };

  serverWebpackCompiler.watch(watchOptions, (err, stats) => {
    if (err || stats.hasErrors()) {
      const errorJson = stats.toString('errors-only');
      log('[server-local] [error] webpack watch() fails:\n%s', errorJson);
    } else {
      const info = stats.toJson(webpackStats);
      log('[server-local] webpack watch() success: at: %s,\n%o', new Date(), info);
      // fs.writeFileSync(`${paths.distServer}/build.json`, JSON.stringify(info, null, 2));
      
      delete require.cache[state.universalAppPath];
      log(
        '[server-local] require cache after deleting universalAppPath (%s):\n%o',
        state.universalAppPath,
        getProperRequireCache(),
      );
      
      const universalAppPath = path.resolve(serverDistPath, 'universal.local.rootContainer.js');
      state.update({
        isLaunched: true,
        universalAppPath,
      });
    }
  });
}

interface LocalServer {
  (arg: {
    makeHtml: MakeHtml;
    publicPath: string;
    serverDistPath: string;
    webpackConfigClientLocalPath: string;
    webpackConfigUniversalLocalPath: string;
    webpackStats: any;
  }): Server;
}
