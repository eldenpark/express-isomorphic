import chalk from 'chalk';
import express, {
  RequestHandler,
} from "express";
import util from 'util';

import { isProduction } from './env';
import { log } from './utils/log';
import state, { State } from './state';

const createExpress: CreateExpress = function ({
  bootstrap = (state) => [],
  extend,
  makeHtml,
  webpackConfig,
}) {
  log('createExpress(): NODE_ENV: %s', process.env.NODE_ENV);

  const _publicPath = webpackConfig && webpackConfig.output.publicPath;

  const app = express();
  extend && extend(app, state);

  const middlewares = bootstrap(state);
  app.use([
    ...middlewares,
    express.static(_publicPath),
  ]);

  app.get('*', [
    serveHtml(state, makeHtml),
  ]);

  return {
    app,
    state,
  };
};

const serveHtml: ServeHtml = (state, makeHtml) => (
  async (req, res, next) => {
    res.writeHead(200, { "Content-Type": "text/html" });

    try {
      const html = await makeHtml({
        assets: state.assets,
        requestUrl: req.url,
      })

      res.end(html);
    } catch (err) {
      log(`serveHtml(): ${chalk.red('failed')} to create html: %o`, err);
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
    resLocals?: ResLocals;
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
    webpackConfig: any;
  }): ServerCreation;
}

interface ResLocals {
  [key: string]: any;
}

interface ServeHtml {
  (state: State, makeHtml: MakeHtml): RequestHandler;
}
