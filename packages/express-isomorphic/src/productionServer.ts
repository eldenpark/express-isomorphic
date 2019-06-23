import createExpress, {
  Extend,
  ServerCreation,
} from './createExpress';
import {
  parseWebpackBuild,
} from './utils/serverUtils';

import { log } from './utils/log';

const productionServer: ProductionServer = function productionServer({
  extend,
  makeHtmlPath,
  webpackBuild,
}) {
  return createExpress({
    bootstrap: (app, serverState) => {
      log(`bootstrap(): webpackBuild:\n%j`, webpackBuild);

      const { error, assets } = parseWebpackBuild(webpackBuild);
      const makeHtml = require(makeHtmlPath).default || require(makeHtmlPath);

      serverState.update({
        assets,
        ...error && {
          error: {
            errorObj: error,
            type: 'WEBPACK_BUILD_ERROR',
          },
        },
        isLaunched: true,
        makeHtml,
      });
    },
    extend,
    htmlGenerator: async ({
      requestUrl,
      serverState,
    }) => {
      const {
        assets,
        makeHtml = () => 'makeHtml not loaded',
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
