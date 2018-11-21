import express from "express";

import { log } from './utils/log';

const createExpress: CreateExpress = function ({
  enhance = (app, state) => {},
  makeHtml,
  publicPath,
}) {
  const app = express();
  const state: State = {
    assets: undefined,
    clientBuildInfo: undefined,
    error: undefined,
    isLaunched: false,
    universalAppPath: undefined,
    update(obj = {}) {
      log('[state] state will update with:\n%o', obj);
      for (let key in this) {
        if (obj[key]) {
          this[key] = obj[key];
        }
      }
    },
    webpackStats: undefined,
  };

  app.use(htmlLogger);

  enhance(app, state);

  app.use(express.static(publicPath));
  
  app.get("*", async (req, res) => {
    if (!state.isLaunched) {
      res.writeHead(500);
      res.end('server is not launched yet');
    } else if (state.error) {
      res.writeHead(500);
      res.end('Server is not successfully launched: %s', state.error);
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
        log('[express] failed to create html: %o', err);
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

export interface State {
  assets: string[] | undefined;
  clientBuildInfo: any;
  error: string | undefined;
  isLaunched: boolean;
  universalAppPath: string | undefined;
  update: (arg: Partial<State>) => void;
  webpackStats: any;
}

export interface Server {
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

interface CreateExpress {
  (arg: {
    enhance: (app: express.Application, state: State) => any;
    makeHtml: MakeHtml;
    publicPath: string;
  }): Server;
}
