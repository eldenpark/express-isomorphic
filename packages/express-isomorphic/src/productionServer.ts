import express from 'express';

import createExpress, {
  Extend,
  ServerCreation,
  WebpackConfig,
} from './createExpress';
import {
  parseWebpackBuild,
} from './utils/serverUtils';
import { log } from './utils/log';

const productionServer: ProductionServer = function ({
  extend,
  makeHtmlPath,
  webpackBuild,
  webpackConfig,
}) {
  return createExpress({
    bootstrap: (app, serverState, webpackConfig) => {
      log(`bootstrap(): webpackBuild:\n%j`, webpackBuild);

      const { error, assets } = parseWebpackBuild(webpackBuild);
      const makeHtml = require(makeHtmlPath).default || require(makeHtmlPath);
      const { path, publicPath } = webpackConfig.output;
      app.use(publicPath, express.static(path));

      serverState.update({
        assets,
        ...error && {
          error: {
            type: 'WEBPACK_BUILD_ERROR',
            errorObj: error,
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
        state
      } = serverState;

      return await makeHtml({
        assets,
        requestUrl,
        state,
      });
    },
    webpackConfig,
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
    webpackConfig: WebpackConfig;
  }): ServerCreation;
}

export default productionServer;
