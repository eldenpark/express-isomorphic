import chalk from 'chalk';
import express, {
  RequestHandler,
} from "express";

import { requireNonNull } from './utils/serverUtils';
import { log } from './utils/log';
import { ServerState, State } from './ServerState';

const createExpress: CreateExpress = function ({
  bootstrap,
  extend,
  htmlGenerator,
  webpackConfig,
}) {
  log('createExpress(): NODE_ENV: %s', process.env.NODE_ENV);

  requireNonNull(webpackConfig, 'createExpress(): webpack config should be present');

  const serverState = new ServerState();
  const app = express();

  if (extend) {
    log('createExpress(): extend is defined thus registered');
    extend(app, serverState);
  }
  bootstrap(app, serverState, webpackConfig);

  app.get('*', [
    serveHtml(serverState, htmlGenerator),
  ]);

  return {
    app,
    serverState,
  };
};

const serveHtml: ServeHtml = (serverState, htmlGenerator) => (
  async (req, res, next) => {
    res.writeHead(200, { "Content-Type": "text/html" });

    try {
      const html = await htmlGenerator({
        requestUrl: req.url,
        serverState,
      });

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
  serverState: ServerState;
}

export interface MakeHtml {
  (arg: {
    assets: string[] | undefined;
    requestUrl: string;
    state: State;
  }): Promise<string>;
}

export interface WebpackStats {
  chunks: boolean;
  entrypoints: boolean;
  [key: string]: boolean;
}

export interface Extend {
  (app: express.Application, serverState: ServerState): void;
}

export interface WebpackConfig {
  output: {
    [key: string]: any;
  };
  [key: string]: any;
}

interface CreateExpress {
  (arg: {
    bootstrap: (
      app: express.Application,
      serverState: ServerState,
      webpackConfig: WebpackConfig,
    ) => void;
    extend?: Extend;
    htmlGenerator: HtmlGenerator;
    webpackConfig: any;
  }): ServerCreation;
}

interface HtmlGenerator {
  (arg: {
    requestUrl: string;
    serverState: ServerState;
  }): Promise<string>;
}

interface ServeHtml {
  (serverState: ServerState, htmlGenerator: HtmlGenerator): RequestHandler;
}

