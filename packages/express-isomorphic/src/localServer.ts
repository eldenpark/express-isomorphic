import chalk from 'chalk';
import del from 'del';
import * as path from "path";
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import createExpress, { 
  Extend,
  MakeHtml,
  ServerCreation,
} from './createExpress';
import { 
  getProperRequireCache,
  parseWebpackBuildInfo,
} from './utils/serverUtils';
import { log } from './utils/log';

const tag = '[localServer]';

let webpackStats = undefined;

const localServer: LocalServer = function ({
  extend,
  makeHtml,
  publicPath,
  serverDistPath,
  webpackConfigClientLocalPath,
  webpackConfigUniversalLocalPath,
  webpackStats,
}) {
  return createExpress({
    _extend: (app, state) => {
      log(
`${tag}
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
        `${tag} webpack-client-local will be compiled with config:\n%o`,
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
        if (state.buildHash !== res.locals.webpackStats.hash) {
          const info = res.locals.webpackStats.toJson(webpackStats);
          const { error, assets } = parseWebpackBuildInfo(info);

          state.update({
            assets,
            buildHash: res.locals.webpackStats.hash,
            ...error && { error },
            isLaunched: true,
          });
        }
        next();
      });

      extend && extend(app, state);
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
    `${tag} [watch] webpack-universal-local will be compiled with config:\n%o`,
    webpackConfig,
  );
  const serverWebpackCompiler = webpack(webpackConfig);
  const watchOptions = {
    aggregateTimeout: 2000,
    poll: undefined,
  };

  serverWebpackCompiler.watch(watchOptions, (err, stats) => {
    if (err || stats.hasErrors()) {
      const error = stats.toString('errors-only');
      log(`${tag} [watch] [error] webpack-universal-local watch() ${chalk.red('fails')}:\n%s`, error);

      state.update({
        error,
      });
    } else {
      const info = stats.toJson(webpackStats);
      log(`${tag} [watch] webpack-universal-local watch() ${chalk.green('success')}: at: %s,\n%o`, new Date(), info);
      // fs.writeFileSync(`${paths.distServer}/build.json`, JSON.stringify(info, null, 2));
      
      delete require.cache[state.universalAppPath];
      log(
        `${tag} [watch] require cache after deleting universalAppPath (%s):\n%o`,
        state.universalAppPath,
        getProperRequireCache(),
      );
      
      const universalAppPath = path.resolve(serverDistPath, 'universal.local.rootContainer.js');
      state.update({
        error: undefined,
        universalAppPath,
      });
    }
  });
}

interface LocalServer {
  (arg: {
    extend?: Extend;
    makeHtml: MakeHtml;
    publicPath: string;
    serverDistPath: string;
    webpackConfigClientLocalPath: string;
    webpackConfigUniversalLocalPath: string;
    webpackStats: any;
  }): ServerCreation;
}
