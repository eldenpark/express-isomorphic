import {
  Application,
} from 'express';
import { logger } from 'jege/server';
import { ServerState } from 'express-isomorphic';
import { Stats } from 'webpack';

import {
  parseWebpackBuild,
} from './internals';
import {
  WebpackServerState,
} from './types';

const log = logger('[express-isomorphic-extension]');

export default function withWebpack({
  serverState,
  webpackBuild,
}: WithWebpackArgs<WebpackServerState>): (app: Application) => Application {
  const { assets, error } = parseWebpackBuild(webpackBuild);

  log(`bootstrap(): webpackBuild: %j`, webpackBuild);

  serverState.update(() => ({
    assets,
  }));

  if (error) {
    serverState.error = {
      errorObj: error,
      type: 'WEBPACK_BUILD_ERROR',
    };
  }

  return (app) => {
    return app;
  };
}

interface WithWebpackArgs<State> {
  serverState: ServerState<State>;
  webpackBuild: Stats.ToJsonOutput;
}
