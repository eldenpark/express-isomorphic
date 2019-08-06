import {
  Application,
} from 'express';
import { logger } from 'jege/server';
import { ServerState } from 'express-isomorphic';

import {
  parseWebpackBuild,
} from './internals';
import {
  WebpackBuild,
  WebpackServerState,
} from './types';

const log = logger('[express-isomorphic-extension]');

export default function withWebpack<State extends WebpackServerState>({
  serverState,
  webpackBuild,
}: WithWebpackArgs<State>): (app: Application) => Application {
  const { assets, error } = parseWebpackBuild(webpackBuild);

  log(`bootstrap(): webpackBuild: %j`, webpackBuild);

  serverState.update((object) => ({
    ...object,
    ...error && {
      error: {
        errorObj: error,
        type: 'WEBPACK_BUILD_ERROR',
      },
    },
    state: {
      ...object.state,
      assets,
    },
  }));

  return (app) => {
    return app;
  };
}

interface WithWebpackArgs<State extends WebpackServerState> {
  serverState: ServerState<State>;
  webpackBuild: WebpackBuild;
}
