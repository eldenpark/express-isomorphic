import {
  Extend,
  MakeHtml,
  ServerCreation,
  WebpackConfig,
} from './createExpress';
import localServer from './localServer';
import productionServer, {
  WebpackBuild,
} from './productionServer';
import ServerState from './ServerState';

const local: Local = (arg) => localServer(arg);
const production: Production = (arg) => productionServer(arg);

export default {
  local,
  production,
};

export { addPath } from './eject';
export {
  Extend,
  Local,
  MakeHtml,
  Production,
  ServerState,
};

interface Local {
  <State>(arg: {
    extend?: Extend<State>;
    makeHtmlPath: MakeHtmlPath;
    watchPaths?: string[];
  }): Promise<ServerCreation<State>>;
}

interface Production {
  <State>(arg: {
    extend?: Extend<State>;
    makeHtmlPath: MakeHtmlPath;
    webpackBuild: WebpackBuild;
    webpackConfig: WebpackConfig;
  }): Promise<ServerCreation<State>>;
}

/**
 * makeHtmlPath should be given as the full path to the makeHtml file.
 * express-isomorphic does take the path to the file, not the module, in order that
 * in local devlelopment, relevant files are to be watched.
 */
type MakeHtmlPath = string;
