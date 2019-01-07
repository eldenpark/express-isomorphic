import chalk from 'chalk';
import express from "express";
import util from 'util';

import { isProduction } from './env';
import { log } from './utils/log';
import state, { State } from './state';

const createExpress: CreateExpress = function ({
  _extend = (app, state) => {},
  makeHtml,
  publicPath,
}) {
  log('NODE_ENV: %s', process.env.NODE_ENV);

  const app = express();

  app.use(htmlLogger);

  _extend(app, state);

  app.use(express.static(publicPath));
  
  app.get("*", async (req, res) => {
    log(
      'server is last updated at: %o, assets: %s, buildHash: %s', 
      state.updatedAt, 
      state.assets,
      state.buildHash,
    );

    if (!state.isLaunched) {
      res.writeHead(500);
      res.end('server is not launched yet');
    } else if (state.error) {
      const errorMsg = !isProduction 
        ? util.format('Server is not successfully launched: %s', state.error)
        : 'Server is not successfully launched. Check out the log';

      res.writeHead(500);
      res.end(errorMsg);
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });

      try {
        const html = await makeHtml({
          assets: state.assets,
          requestUrl: req.url,  
          universalAppPath: state.universalAppPath,
        });
        res.end(html);
      } catch (err) {
        log(`[express] ${chalk.red('failed')} to create html: %o`, err);
        res.end('Failed to create html');
      }
    }
  });
  
  return {
    app,
    state,
  };
};

export default createExpress;

function htmlLogger(req, res, next) {
  log('[express] %s url: %s, user agent: %s', new Date(), req.url, req.get('User-Agent'));
  next();
}

export interface ServerCreation {
  app: express.Application;
  state: State;
}

export interface MakeHtml {
  (arg: {
    assets: string[] | undefined;
    requestUrl: string;
    universalAppPath: string | undefined;
  }): Promise<string>;
}

export interface WebpackStats {
  chunks: boolean;
  entrypoints: boolean;
  [x: string]: boolean;
}

export interface Extend {
  (app: express.Application, state: State): any;
}

interface CreateExpress {
  (arg: {
    _extend: Extend;
    makeHtml: MakeHtml;
    publicPath: string;
  }): ServerCreation;
}
