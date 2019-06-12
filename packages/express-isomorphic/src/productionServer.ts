import express from 'express';

import createExpress, {
  Extend,
  MakeHtml,
  ServerCreation,
} from './createExpress';
import {
  parseWebpackBuildInfo,
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
      const buildInfo = webpackBuild;
      log(`bootstrap(): build.json:\n%j`, buildInfo);

      const { error, assets } = parseWebpackBuildInfo(buildInfo);
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

interface ProductionServer {
  (arg: {
    extend?: Extend;
    makeHtmlPath: string;
    webpackBuild: any;
    webpackConfig: any;
  }): ServerCreation;
}

export default productionServer;
