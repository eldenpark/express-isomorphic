import _localServer from './localServer';
import _eject from './eject';
import { 
  Extend,
  MakeHtml,
  ServerCreation,
  WebpackStats,
} from './createExpress';
import _server from './server';

const create: Create = function ({
  ejectPath = '',
  extend,
  makeHtml,
  publicPath,
  serverDistPath,
  universalAppPath,
  webpackBuildJsonPath,
  webpackConfigClientLocalPath,
  webpackConfigUniversalLocalPath,
  webpackStats = defaultWebpackStats,
}) {
  return {
    eject: () => _eject({
      ejectPath,
      makeHtml,
      publicPath,
      universalAppPath,
      webpackBuildJsonPath,
    }),
    localServer: () => _localServer({
      extend,
      makeHtml,
      publicPath,
      serverDistPath,
      webpackConfigClientLocalPath,
      webpackConfigUniversalLocalPath,
      webpackStats,
    }),
    server: () => _server({
      extend,
      makeHtml,
      publicPath,
      universalAppPath,
      webpackBuildJsonPath,
    }),
  };
};

const ExpressIsomorphic: ExpressIsomorphicType = {
  create,
};

const defaultWebpackStats = {
  all: false,
  assets: true,
  builtAt: true,
  chunks: true,
  color: true,
  entrypoints: true,
};

export default ExpressIsomorphic;

export { attachAssets } from './utils/serverUtils';

export { defaultWebpackStats as webpackStats }

interface ExpressIsomorphicType {
  create: Create,
}

interface Create {
  (arg: {
    /**
     * Function to use if you want to extend Express application.
     */
    extend?: Extend;
    ejectPath?: string;
    /**
     * On server side rendering, makeHtml() is called to serve static html.
     */
    makeHtml: MakeHtml;
    /**
     * express public path
     */
    publicPath: string;
    serverDistPath: string;
    /**
     * The path to universal app entry. It is dynamically generated with localServer.
     * If you use server, then it should be predetermined.
     */
    universalAppPath: string;
    /**
     * The path of webpack build object.
     */
    webpackBuildJsonPath: string;
    webpackConfigClientLocalPath: string;
    webpackConfigUniversalLocalPath: string;
    webpackStats?: WebpackStats;
  }): {
    eject: any;
    localServer: () => ServerCreation;
    server: () => ServerCreation;
  };
}
