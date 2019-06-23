import chalk from 'chalk';
import express, {
  RequestHandler,
} from 'express';
import { logger } from '@nodekit/logger';

import ServerState from './ServerState';

const log = logger('[express-isomorphic]');

function createExpress<State>({
  bootstrap,
  extend,
  htmlGenerator,
}) {
  log('createExpress(): NODE_ENV: %s', process.env.NODE_ENV);

  const serverState = new ServerState<State>();
  const app = express();

  if (extend) {
    log('createExpress(): extend is defined thus registered');
    extend(app, serverState);
  }
  bootstrap(app, serverState);

  app.get('*', [
    serveHtml(serverState, htmlGenerator),
  ]);

  return {
    app,
    serverState,
  };
}

function serveHtml<State>(
  serverState: ServerState<State>,
  htmlGenerator: HtmlGenerator,
): RequestHandler {
  return async (req, res) => {
    res.writeHead(200, {
      'Content-Type': 'text/html',
    });

    try {
      const html = await htmlGenerator({
        requestUrl: req.url,
        serverState,
      });

      res.end(html.toString());
    } catch (err) {
      log(`serveHtml(): ${chalk.red('failed')} to create html: %o`, err);
      res.end('Failed to create html');
    }
  };
}

export default createExpress;

export interface ServerCreation<State> {
  app: express.Application;
  serverState: ServerState<State>;
}

export interface MakeHtml<State> {
  (arg: MakeHtmlPayload<State>): Promise<string> | string;
}

export interface MakeHtmlPayload<State> {
  requestUrl: string;
  serverState: ServerState<State>;
}

export interface WebpackStats {
  chunks: boolean;
  entrypoints: boolean;
  [key: string]: boolean;
}

export interface Extend<State> {
  (app: express.Application, serverState: ServerState<State>): void;
}

export interface WebpackConfig {
  output: {
    [key: string]: any;
  };
  [key: string]: any;
}

interface CreateExpress {
  <State>(arg: {
    bootstrap: (
      app: express.Application,
      serverState: ServerState<State>,
    ) => void;
    extend?: Extend<State>;
    htmlGenerator: HtmlGenerator;
  }): ServerCreation<State>;
}

interface HtmlGenerator {
  <State>(arg: {
    requestUrl: string;
    serverState: ServerState<State>;
  }): Promise<string>;
}
