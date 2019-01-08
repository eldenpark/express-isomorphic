import * as fs from 'fs';

import createExpress, { 
  Extend,
  MakeHtml,
  ServerCreation,
} from './createExpress';
import ErrorType from './ErrorType';
import { 
  parseWebpackBuildInfo,
} from './utils/serverUtils';
import { log } from './utils/log';

const tag = 'server';

const server: Server = function ({
  extend,
  makeHtml,
  publicPath,
  universalAppPath,
  webpackBuildJsonPath,
}) {
  return createExpress({
    _extend: (app, state) => {
      const bundleBuildJson = fs.readFileSync(webpackBuildJsonPath, 'utf-8');
      const buildInfo = JSON.parse(bundleBuildJson);
      log(`%s enhance(), build.json:\n%o`, tag, buildInfo);
  
      const { error, assets } = parseWebpackBuildInfo(buildInfo);
          
      state.update({
        assets,
        ...error && { 
          error: {
            type: ErrorType.BUILD_ERROR,
            errorObj: error,
          },
        },
        isLaunched: true,
        universalAppPath,
      });

      extend && extend(app, state);
    },
    makeHtml,
    publicPath,
  });
};

interface Server {
  (arg: {
    extend?: Extend;
    makeHtml: MakeHtml;
    publicPath: string;
    universalAppPath: string;
    webpackBuildJsonPath: string;
  }): ServerCreation;
} 

export default server;
