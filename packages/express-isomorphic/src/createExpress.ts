import chalk from 'chalk';
import express, {
  RequestHandler,
} from "express";
import util from 'util';

import { isProduction } from './env';
import { htmlLogger, log } from './utils/log';
import state, { State } from './state';

const createExpress: CreateExpress = function ({
  bootstrap = (state) => [],
  extend,
  makeHtml,
  publicPath,
  webpackConfig,
}) {
  log('Creating express, NODE_ENV: %s', process.env.NODE_ENV);

  const _publicPath = webpackConfig && webpackConfig.output.publicPath;

  const app = express();
  const middlewares = bootstrap(state);
  extend && extend(app, state);

  app.use([
    ...middlewares,
    htmlLogger,
    express.static(_publicPath),
  ]);

  app.get('*', [
    logServerUpdate(state),
    checkLaunch(state),
    checkBundleError(state),
    serveHtml(state, makeHtml),
  ]);

  return {
    app,
    state,
  };
};

const logServerUpdate: (state: State) => RequestHandler = (state) => (req, res, next) => {
  log(
    'logServerUpdate(): server last updated at: %o, assets: %s, buildHash: %s',
    state.updatedAt,
    state.assets,
    state.buildHash,
  );
  next();
};

const checkLaunch: (state: State) => RequestHandler = (state) => (req, res, next) => {
  if (!state.isLaunched) {
    res.writeHead(500);
    res.end('server is not launched yet');
  }
  next();
};

const checkBundleError: (state: State) => RequestHandler = (state) => (req, res, next) => {
  if (state.error) {
    const errorMsg = !isProduction
      ? util.format('Server is not successfully launched: %s', state.error)
      : 'Server is not successfully launched. Check out the log';

    res.writeHead(500);
    res.end(errorMsg);
  } else {
    next();
  }
};

const serveHtml: (state: State, makeHtml: MakeHtml) => RequestHandler = (state, makeHtml) => (
  async (req, res, next) => {
    res.writeHead(200, { "Content-Type": "text/html" });

    try {
      const html = await makeHtml({
        assets: state.assets,
        requestUrl: req.url,
        resLocals: res.locals,
        universalAppPath: state.universalAppPath,
      });
      res.end(html);
    } catch (err) {
      log(`[express] ${chalk.red('failed')} to create html: %o`, err);
      res.end('Failed to create html');
    }
  }
);

export default createExpress;

export interface ServerCreation {
  app: express.Application;
  state: State;
}

export interface MakeHtml {
  (arg: {
    assets: string[] | undefined;
    requestUrl: string;
    resLocals: ResLocals;
    universalAppPath: string | undefined;
  }): Promise<string>;
}

export interface WebpackStats {
  chunks: boolean;
  entrypoints: boolean;
  [x: string]: boolean;
}

export interface Extend {
  (app, state): any;
}

interface CreateExpress {
  (arg: {
    bootstrap: (state: State) => RequestHandler[];
    extend?: (app: express.Application, state: State) => void;
    makeHtml: MakeHtml;
    publicPath: string;
    webpackConfig: any;
  }): ServerCreation;
}

interface ResLocals {
  [key: string]: any;
}
