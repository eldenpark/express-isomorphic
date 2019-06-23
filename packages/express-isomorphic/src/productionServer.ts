import { logger } from '@nodekit/logger';

import createExpress, {
  Extend,
  ServerCreation,
} from './createExpress';
import {
  parseWebpackBuild,
} from './utils/serverUtils';

const log = logger('[express-isomorphic]');

const productionServer: ProductionServer = function productionServer({
  extend,
  makeHtmlPath,
  webpackBuild,
}) {
  const makeHtml = require(makeHtmlPath).default || require(makeHtmlPath);

  return createExpress({
    bootstrap: (app, serverState) => {
      log(`bootstrap(): webpackBuild:\n%j`, webpackBuild);

      const { error, assets } = parseWebpackBuild(webpackBuild);

      serverState.update({
        assets,
        ...error && {
          error: {
            errorObj: error,
            type: 'WEBPACK_BUILD_ERROR',
          },
        },
        isLaunched: true,
      });
    },
    extend,
    htmlGenerator: async ({
      requestUrl,
      serverState,
    }) => {
      const {
        assets,
        state,
      } = serverState;

      return makeHtml({
        assets,
        requestUrl,
        state,
      });
    },
  });
};

export interface WebpackBuild {
  assets: any[];
  builtAt: number;
  entrypoints: {
    [key: string]: {
      assets: string[];
    };
  };
  errors: any[];
}

interface ProductionServer {
  (arg: {
    extend?: Extend;
    makeHtmlPath: string;
    webpackBuild: WebpackBuild;
  }): ServerCreation;
}

export default productionServer;
