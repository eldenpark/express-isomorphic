import {
  Extend,
  MakeHtml,
  ServerCreation,
  WebpackConfig,
  WebpackStats,
} from './createExpress';
import localServer from './localServer';
import productionServer, {
  WebpackBuild,
} from './productionServer';

const local: Local = (arg) => localServer(arg);
const production: Production = (arg) => productionServer(arg);

export default {
  local,
  production,
}

export { addPath } from './eject';

export { attachAssets } from './utils/serverUtils';

export {
  Extend,
  Local,
  MakeHtml,
  Production,
}

interface Local {
  (arg: {
    extend?: Extend;
    makeHtmlPath: MakeHtmlPath;
    webpackConfig: WebpackConfig;
    webpackStats?: WebpackStats;
  }): ServerCreation;
}

interface Production {
  (arg: {
    extend?: Extend;
    makeHtmlPath: MakeHtmlPath;
    webpackBuild: WebpackBuild;
    webpackConfig: WebpackConfig;
  }): ServerCreation;
}

/**
 * makeHtmlPath should be given as the full path to the makeHtml file.
 * express-isomorphic does take the path to the file, not the module, in order that
 * in local devlelopment, relevant files are to be watched.
 */
type MakeHtmlPath = string;
